import { useState, useEffect, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { toast } from './ui/use-toast';
import { apiClient } from '@/lib/apiClient';

interface Notification {
  _id: string;
  message: string;
  link?: string;
  timestamp: string;
  seen: boolean;
}

const ReminderSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  // استدعاء الإشعارات من الخادم
  const fetchNotifications = useCallback(async () => {
    try {
      // التحقق من صحة الاتصال بالخادم أولاً
      const isHealthy = await apiClient.checkHealth();
      
      if (!isHealthy) {
        setIsConnected(false);
        return false;
      }
      
      setIsConnected(true);
      
      // إرسال وقت آخر استعلام للحصول على الإشعارات الجديدة فقط
      const params = lastFetchTime 
        ? `?since=${lastFetchTime.toISOString()}`
        : '';
      
      const response = await fetch(`/api/notifications${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.status}`);
      }
      
      const data = await response.json();
      
      // تحديث وقت آخر استعلام
      setLastFetchTime(new Date());
      
      if (data.length > 0) {
        // دمج الإشعارات الجديدة مع القائمة الحالية
        setNotifications(prevNotifications => {
          // إنشاء مجموعة من معرفات الإشعارات الحالية
          const existingIds = new Set(prevNotifications.map(n => n._id));
          
          // إضافة الإشعارات الجديدة فقط
          const newNotifications = data.filter(n => !existingIds.has(n._id));
          
          if (newNotifications.length > 0) {
            // إظهار إشعار للمستخدم إذا كانت هناك إشعارات جديدة
            toast({
              title: 'إشعارات جديدة',
              description: `لديك ${newNotifications.length} إشعار جديد`,
              duration: 3000,
            });
          }
          
          // دمج الإشعارات القديمة والجديدة وترتيبها حسب الوقت
          return [...prevNotifications, ...newNotifications]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        });
      }
      
      return data.length > 0;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setIsConnected(false);
      return false;
    }
  }, [lastFetchTime]);

  // Long polling لمزامنة الإشعارات
  const startLongPolling = useCallback(async () => {
    try {
      const hasNewNotifications = await fetchNotifications();
      
      // تحديث عدد الإشعارات غير المقروءة
      setUnreadCount(notifications.filter(n => !n.seen).length);
      
      // استدعاء مرة أخرى بعد فترة زمنية (10 ثواني)
      setTimeout(startLongPolling, 10000);
      
      return hasNewNotifications;
    } catch (error) {
      console.error('Long polling error:', error);
      
      // إعادة المحاولة بعد فترة أطول في حالة الخطأ
      setTimeout(startLongPolling, 30000);
      return false;
    }
  }, [fetchNotifications, notifications]);

  // بدء Long Polling عند تحميل المكون
  useEffect(() => {
    startLongPolling();
    
    // تنظيف عند إزالة المكون
    return () => {
      // إيقاف Long Polling (لا يمكن إلغاء setTimeout بشكل مباشر هنا لأن الدالة غير متزامنة)
    };
  }, [startLongPolling]);

  // تعليم الإشعار كمقروء
  const markAsSeen = async (id: string) => {
    try {
      if (!isConnected) {
        // تحديث الحالة محليًا فقط إذا كان الاتصال بالخادم غير متاح
        setNotifications(prevNotifications => 
          prevNotifications.map(n => n._id === id ? { ...n, seen: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
        return;
      }
      
      const response = await fetch(`/api/notifications/${id}/seen`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark notification as seen');
      }
      
      // تحديث الحالة المحلية
      setNotifications(prevNotifications => 
        prevNotifications.map(n => n._id === id ? { ...n, seen: true } : n)
      );
      
      // تحديث عدد الإشعارات غير المقروءة
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as seen:', error);
      
      // تحديث الحالة المحلية حتى في حالة الخطأ
      setNotifications(prevNotifications => 
        prevNotifications.map(n => n._id === id ? { ...n, seen: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  // فتح الرابط وتعليم الإشعار كمقروء
  const handleNotificationClick = (notification: Notification) => {
    // تعليم الإشعار كمقروء
    if (!notification.seen) {
      markAsSeen(notification._id);
    }
    
    // فتح الرابط إذا كان موجودًا
    if (notification.link) {
      window.open(notification.link, '_blank');
    }
    
    // إغلاق قائمة الإشعارات
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="الإشعارات"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">الإشعارات</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                لا توجد إشعارات
              </div>
            ) : (
              <ul>
                {notifications.map(notification => (
                  <li 
                    key={notification._id}
                    className={`p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                      !notification.seen ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start">
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(notification.timestamp).toLocaleString('ar-EG')}
                        </p>
                      </div>
                      {!notification.seen && (
                        <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
            {!isConnected && (
              <div className="p-2 text-center text-xs text-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400">
                تعذر الاتصال بالخادم. قد لا تكون الإشعارات محدثة.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderSystem;
