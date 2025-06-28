import { useState, useEffect, useRef } from 'react';
import { X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Notification {
  _id: string;
  id?: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  active: boolean;
  expiresAt: string;
  createdAt: string;
  displayDuration?: number; // Duration in seconds to display the notification
}

const ReminderSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // تتبع الإشعارات التي تم عرضها بالفعل
  const shownNotificationsRef = useRef<Set<string>>(new Set());
  
  // Default display duration (in seconds)
  const DEFAULT_DISPLAY_DURATION = 3;

  // Function to load and filter notifications from localStorage
  const loadNotificationsFromStorage = () => {
    try {
      const storedNotifications = localStorage.getItem('notifications');
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        console.log("Loaded notifications from localStorage:", parsedNotifications);
        
        // Filter out expired notifications
        const now = new Date();
        const activeNotifications = parsedNotifications.filter((n: Notification) => {
          // Make sure expiresAt is properly defined
          if (!n.expiresAt) return false;
          
          // Parse date and check if it's still valid
          try {
            const expiryDate = new Date(n.expiresAt);
            return expiryDate > now && n.active !== false;
          } catch (e) {
            console.error("Invalid date format in notification:", n);
            return false;
          }
        });
        
        // التحقق من الإشعارات الجديدة فقط (التي لم يتم عرضها من قبل)
        const newNotifications = activeNotifications.filter(n => 
          !shownNotificationsRef.current.has(n._id || n.id || '')
        );
        
        if (newNotifications.length > 0) {
          console.log("New active notifications found:", newNotifications.length);
          setNotifications(newNotifications);
          setShowNotification(true);
          return true;
        } else if (activeNotifications.length === 0) {
          // إذا لم تكن هناك إشعارات نشطة، فقم بإخفاء الإشعارات
          setShowNotification(false);
          return false;
        }
      }
    } catch (error) {
      console.error('Error loading notifications from localStorage:', error);
    }
    return false;
  };

  // Function to fetch and filter notifications
  const fetchAndUpdateNotifications = () => {
      try {
        setIsLoading(true);
      
      // Try API first - use relative URL or base URL from apiClient
      const apiBaseUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api' 
        : '/api';
        
      fetch(`${apiBaseUrl}/notifications`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch notifications');
          }
          return response.json();
        })
        .then(data => {
          console.log("API notifications loaded:", data);
          if (Array.isArray(data) && data.length > 0) {
            // التحقق من الإشعارات الجديدة فقط (التي لم يتم عرضها من قبل)
            const newNotifications = data.filter(n => 
              !shownNotificationsRef.current.has(n._id || n.id || '')
            );
            
            if (newNotifications.length > 0) {
              setNotifications(newNotifications);
              setShowNotification(true);
            }
          } else {
            // If API returns empty array, try localStorage
            if (!loadNotificationsFromStorage()) {
              setShowNotification(false);
            }
          }
          setIsLoading(false);
        })
        .catch(apiError => {
          console.error('API Error fetching notifications:', apiError);
          
          // Fallback to localStorage
          if (!loadNotificationsFromStorage()) {
            setShowNotification(false);
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      // Try localStorage as a last resort
      if (!loadNotificationsFromStorage()) {
        setShowNotification(false);
      }
        setIsLoading(false);
      }
    };

  // Fetch notifications initially
  useEffect(() => {
    console.log("ReminderSystem: Initial load");
    
    // تهيئة قائمة الإشعارات التي تم عرضها
    shownNotificationsRef.current = new Set();
    
    fetchAndUpdateNotifications();
    
    // Force check localStorage directly on mount
    loadNotificationsFromStorage();

    // Refresh notifications every 5 minutes
    const intervalId = setInterval(fetchAndUpdateNotifications, 5 * 60 * 1000);

    // Listen for storage changes (when admin adds new notification in a different tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'notifications') {
        console.log("Storage changed event detected!");
        loadNotificationsFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Listen for custom event for changes in the same window
  useEffect(() => {
    const handleLocalChange = () => {
      console.log("localStorageChanged event detected!");
      loadNotificationsFromStorage();
    };
    
    window.addEventListener('localStorageChanged', handleLocalChange as EventListener);
    return () => {
      window.removeEventListener('localStorageChanged', handleLocalChange as EventListener);
    };
  }, []);

  // Auto-hide notification after specified duration and mark as shown
  useEffect(() => {
    if (showNotification && notifications.length > 0) {
      const currentNotification = notifications[currentNotificationIndex];
      if (!currentNotification) return;

      // تسجيل الإشعار كإشعار تم عرضه بالفعل
      const notificationId = currentNotification._id || currentNotification.id;
      if (notificationId) {
        shownNotificationsRef.current.add(notificationId);
      }
      
      // Make sure we have a valid duration (in seconds)
      const duration = currentNotification && currentNotification.displayDuration ? 
        currentNotification.displayDuration * 1000 : DEFAULT_DISPLAY_DURATION * 1000;
      
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [currentNotificationIndex, notifications, showNotification, DEFAULT_DISPLAY_DURATION]);

  // Get the current notification
  const currentNotification = notifications[currentNotificationIndex];

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  // Get notification badge based on type
  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'info':
        return <Badge className="bg-blue-500">معلومات</Badge>;
      case 'success':
        return <Badge className="bg-green-500">نجاح</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">تحذير</Badge>;
      case 'error':
        return <Badge className="bg-red-500">تنبيه</Badge>;
      default:
        return <Badge className="bg-blue-500">معلومات</Badge>;
    }
  };

  // Get notification background color based on type
  const getNotificationBackground = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  // Close notification
  const handleClose = () => {
    setShowNotification(false);
  };

  // Go to next notification
  const handleNext = () => {
    setShowNotification(false);
    setTimeout(() => {
    setCurrentNotificationIndex((prevIndex) => 
      prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
    );
      setShowNotification(true);
    }, 300);
  };

  // Go to previous notification
  const handlePrev = () => {
    setShowNotification(false);
    setTimeout(() => {
    setCurrentNotificationIndex((prevIndex) => 
      prevIndex === 0 ? notifications.length - 1 : prevIndex - 1
    );
      setShowNotification(true);
    }, 300);
  };

  // Don't render anything if there are no notifications to show
  if (isLoading || !showNotification || !currentNotification || notifications.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 p-4 rounded-lg shadow-lg border ${getNotificationBackground(currentNotification.type)}`}
          dir="rtl"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {getNotificationIcon(currentNotification.type)}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{currentNotification.title}</h3>
                  {getNotificationBadge(currentNotification.type)}
                </div>
              </div>
        </div>
        <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-gray-700">{currentNotification.content}</div>
          
          {notifications.length > 1 && (
            <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
              <div>
                {currentNotificationIndex + 1} من {notifications.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="px-2 py-1 bg-white rounded border hover:bg-gray-50"
        >
                  السابق
                </button>
                <button
                  onClick={handleNext}
                  className="px-2 py-1 bg-white rounded border hover:bg-gray-50"
                >
                  التالي
        </button>
      </div>
    </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReminderSystem;
