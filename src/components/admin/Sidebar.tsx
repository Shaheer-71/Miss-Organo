import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag,
  LogOut,
  X,
  Leaf
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' }
  ];

  return (
    <div className="w-64 h-screen shadow-sm flex flex-col fixed top-0 left-0" style={{ backgroundColor: '#e8ebde' }}>
      <div className="p-6 border-b border-primary-100" style={{ backgroundColor: '#e8ebde' }}>
        <div className="flex items-center gap-3">
          <Leaf className="w-8 h-8 text-primary-500" />
          <h2 className="font-serif text-2xl font-medium text-secondary-800">
            Miss Organo
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden ml-auto p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-[#dfe3d0] text-primary-700'
                      : 'text-gray-600 hover:bg-[#e3e7d6] hover:text-primary-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-primary-100">
        <button
          onClick={() => logout()}
          className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#e3e7d6] hover:text-primary-600 rounded-md w-full transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;