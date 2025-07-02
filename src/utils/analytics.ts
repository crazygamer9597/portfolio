interface VisitorData {
  id: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location: {
    country?: string;
    city?: string;
    timezone: string;
  };
  screen: {
    width: number;
    height: number;
    colorDepth: number;
  };
  browser: {
    name: string;
    version: string;
    language: string;
    platform: string;
  };
  referrer: string;
  sessionDuration: number;
  pagesViewed: string[];
  interactions: {
    clicks: number;
    scrollDepth: number;
    timeOnPage: number;
  };
}

interface PageView {
  page: string;
  timestamp: Date;
  duration: number;
}

class Analytics {
  private sessionId: string;
  private startTime: Date;
  private currentPage: string = 'home';
  private pageViews: PageView[] = [];
  private interactions = {
    clicks: 0,
    scrollDepth: 0,
    timeOnPage: 0
  };

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = new Date();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private async getIPAddress(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('Could not fetch IP address:', error);
      return 'unknown';
    }
  }

  private async getLocationData(): Promise<any> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        country: data.country_name,
        city: data.city,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    } catch (error) {
      console.warn('Could not fetch location data:', error);
      return {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    }
  }

  private getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';

    if (ua.includes('Chrome')) {
      browserName = 'Chrome';
      browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Firefox')) {
      browserName = 'Firefox';
      browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Safari')) {
      browserName = 'Safari';
      browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Edge')) {
      browserName = 'Edge';
      browserVersion = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
    }

    return {
      name: browserName,
      version: browserVersion,
      language: navigator.language,
      platform: navigator.platform
    };
  }

  private initializeTracking() {
    // Track clicks
    document.addEventListener('click', () => {
      this.interactions.clicks++;
      this.saveToLocalStorage();
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        this.interactions.scrollDepth = maxScrollDepth;
        this.saveToLocalStorage();
      }
    });

    // Track time on page
    setInterval(() => {
      this.interactions.timeOnPage = Math.floor((Date.now() - this.startTime.getTime()) / 1000);
      this.saveToLocalStorage();
    }, 5000);

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.saveToLocalStorage();
      }
    });

    // Track before unload
    window.addEventListener('beforeunload', () => {
      this.saveToLocalStorage();
    });
  }

  public trackPageView(page: string) {
    if (this.currentPage !== page) {
      // Save previous page duration
      if (this.pageViews.length > 0) {
        const lastPage = this.pageViews[this.pageViews.length - 1];
        lastPage.duration = Date.now() - lastPage.timestamp.getTime();
      }

      // Add new page view
      this.pageViews.push({
        page,
        timestamp: new Date(),
        duration: 0
      });

      this.currentPage = page;
      this.saveToLocalStorage();
    }
  }

  public async collectVisitorData(): Promise<VisitorData> {
    const [ipAddress, location] = await Promise.all([
      this.getIPAddress(),
      this.getLocationData()
    ]);

    return {
      id: this.sessionId,
      timestamp: this.startTime,
      ipAddress,
      userAgent: navigator.userAgent,
      location,
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
      },
      browser: this.getBrowserInfo(),
      referrer: document.referrer || 'direct',
      sessionDuration: Math.floor((Date.now() - this.startTime.getTime()) / 1000),
      pagesViewed: this.pageViews.map(pv => pv.page),
      interactions: this.interactions
    };
  }

  private saveToLocalStorage() {
    try {
      const data = {
        sessionId: this.sessionId,
        startTime: this.startTime,
        pageViews: this.pageViews,
        interactions: this.interactions
      };
      localStorage.setItem('portfolio_analytics', JSON.stringify(data));
    } catch (error) {
      console.warn('Could not save analytics to localStorage:', error);
    }
  }

  public getStoredAnalytics(): any[] {
    try {
      const stored = localStorage.getItem('portfolio_analytics_history');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Could not retrieve stored analytics:', error);
      return [];
    }
  }

  public async saveSession() {
    try {
      const visitorData = await this.collectVisitorData();
      const stored = this.getStoredAnalytics();
      stored.push(visitorData);
      
      // Keep only last 100 sessions
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      
      localStorage.setItem('portfolio_analytics_history', JSON.stringify(stored));
    } catch (error) {
      console.warn('Could not save session data:', error);
    }
  }
}

export const analytics = new Analytics();

// Initialize tracking on page load
if (typeof window !== 'undefined') {
  analytics.trackPageView('home');
  
  // Save session data periodically
  setInterval(() => {
    analytics.saveSession();
  }, 30000); // Every 30 seconds
  
  // Save on page unload
  window.addEventListener('beforeunload', () => {
    analytics.saveSession();
  });
}