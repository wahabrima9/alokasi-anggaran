
import React, { useState, useEffect } from 'react';
import { ArrowDownTrayIcon, BellIcon, TrophyIcon, LayoutGridIcon, ListBulletIcon, Squares2x2Icon, ChartBarIcon, FireIcon, PaintBrushIcon, CreditCardIcon, BuildingLibraryIcon, ShoppingCartIcon, HeartIcon, CircleStackIcon, ShoppingBagIcon, UserIcon, DocumentTextIcon, CameraIcon, SparklesIcon, LightbulbIcon, ChatBubbleLeftRightIcon, SpeakerWaveIcon, Cog6ToothIcon, LockClosedIcon, TicketIcon, HandRaisedIcon, GiftIcon } from './Icons';
import { Achievement } from '../types';
import { AI_COSTS, FEATURE_UNLOCK_LEVELS } from '../constants';

// --- MODAL COMPONENTS ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    contentClassName?: string;
    originCoords?: { x: number, y: number } | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'md', contentClassName = 'p-6', originCoords }) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    const transformOriginStyle = originCoords 
        ? { transformOrigin: `${originCoords.x}px ${originCoords.y}px` } 
        : {};

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300" onClick={onClose}>
            <div 
                style={transformOriginStyle}
                className={`
                    bg-white/90 backdrop-blur-xl border border-white/20 
                    rounded-2xl shadow-2xl w-full ${sizeClasses[size]} 
                    animate-spring-up flex flex-col max-h-[90vh]
                `} 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200/50 flex-shrink-0">
                    <h3 className="text-lg font-bold text-primary-navy">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl transition-colors">&times;</button>
                </div>
                <div className={`${contentClassName} overflow-y-auto`}>{children}</div>
            </div>
        </div>
    );
};

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: React.ReactNode;
}
export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-sm text-center p-6 animate-spring-up">
                <div className="text-dark-text mb-6">{message}</div>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-200 text-dark-text font-semibold hover:bg-gray-300 transition-colors">Batal</button>
                    <button onClick={onConfirm} className="px-6 py-2 rounded-lg bg-danger-red text-white font-semibold hover:bg-danger-red-dark transition-colors">OK</button>
                </div>
            </div>
        </div>
    );
};

// --- TOAST COMPONENTS ---
export const DailyBackupToast: React.FC<{
    backup: { url: string; filename: string };
    onClose: () => void;
}> = ({ backup, onClose }) => {
    return (
        <div 
            className="fixed top-5 right-4 z-[100] bg-white/90 backdrop-blur-md border border-white/40 rounded-xl shadow-2xl p-4 flex items-center space-x-4 max-w-[calc(100vw-2rem)] md:max-w-md animate-fade-in-down"
        >
            <ArrowDownTrayIcon className="w-10 h-10 text-accent-teal flex-shrink-0" />
            <div>
                <p className="font-bold text-primary-navy">Cadangan Periodik Tersedia</p>
                <p className="text-sm text-secondary-gray">Simpan data Anda untuk keamanan.</p>
                <div className="flex gap-3 mt-2">
                    <a 
                        href={backup.url}
                        download={backup.filename}
                        className="text-sm bg-accent-teal text-white font-semibold py-1 px-3 rounded-lg hover:bg-accent-teal-dark transition-colors"
                    >
                        Unduh Sekarang
                    </a>
                     <button onClick={onClose} className="text-sm text-secondary-gray font-semibold hover:underline">
                        Nanti
                    </button>
                </div>
            </div>
        </div>
    );
};

export const NotificationToast: React.FC<{
    messages: string[];
    onClose: () => void;
}> = ({ messages, onClose }) => {
    if (messages.length === 0) return null;
    return (
        <div className="fixed top-5 right-4 z-[110] flex flex-col gap-2 animate-fade-in-left max-w-[calc(100vw-2rem)]">
            {messages.map((msg, idx) => (
                <div key={idx} className="bg-white/90 backdrop-blur-md border-l-4 border-warning-yellow rounded-lg shadow-xl p-4 flex items-start gap-3 w-full">
                    <BellIcon className="w-6 h-6 text-warning-yellow flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-dark-text">{msg}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-auto text-xs">&times;</button>
                </div>
            ))}
        </div>
    );
}

export const AchievementUnlockedToast: React.FC<{ achievement: Achievement | null }> = ({ achievement }) => {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => { 
        if (achievement) { 
            setVisible(true); 
            const timer = setTimeout(() => setVisible(false), 3500); 
            return () => clearTimeout(timer); 
        } 
    }, [achievement]);
    
    return (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out ${visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
            {achievement && (<div className="bg-primary-navy/95 backdrop-blur-md text-white rounded-xl shadow-2xl p-4 flex items-center space-x-4 max-w-sm mx-auto border border-white/10"><TrophyIcon className="w-10 h-10 text-warning-yellow flex-shrink-0" /><div><p className="font-bold">Lencana Terbuka!</p><p className="text-sm">{achievement.name}</p></div></div>)}
        </div>
    );
};

// --- NAVIGATION COMPONENTS ---
type Page = 'dashboard' | 'reports' | 'visualizations' | 'savings' | 'achievements' | 'missions' | 'personalBest' | 'netWorth' | 'wishlist' | 'subscriptions' | 'profile' | 'shop' | 'customApp' | 'shoppingList';

export const BottomNavBar: React.FC<{ currentPage: Page; onNavigate: (page: Page) => void; onOpenMenu: () => void; userLevel: number; }> = ({ currentPage, onNavigate, onOpenMenu, userLevel }) => {
    
    const isLocked = (key: string) => {
        const req = FEATURE_UNLOCK_LEVELS[key];
        return req ? userLevel < req : false;
    };

    const NavItem = ({ page, icon: Icon, label, lockKey }: { page: Page, icon: React.FC<{className?: string}>, label: string, lockKey?: string }) => {
        const isActive = currentPage === page;
        const locked = lockKey ? isLocked(lockKey) : false;
        
        return ( 
            <button 
                onClick={() => !locked && onNavigate(page)} 
                disabled={locked}
                className={`group flex flex-col items-center justify-center w-full h-full pt-3 pb-1 focus:outline-none ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                    <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-primary-navy' : 'text-gray-300 group-hover:text-gray-500'}`} />
                    {locked && (
                        <div className="absolute -top-1 -right-1 bg-gray-500 text-white p-0.5 rounded-full border border-white">
                            <LockClosedIcon className="w-2 h-2" />
                        </div>
                    )}
                </div>
                <span className={`text-[10px] font-bold mt-1 transition-colors duration-300 ${isActive ? 'text-primary-navy' : 'text-gray-300 group-hover:text-gray-500'}`}>
                    {label}
                </span>
                <div className={`w-1 h-1 rounded-full bg-primary-navy mt-1 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
            </button> 
        );
    };

    return ( 
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-5px_25px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl">
            <nav className="flex justify-between items-end h-[80px] px-2 pb-2 max-w-md mx-auto relative">
                <div className="flex-1 h-full"><NavItem page="dashboard" icon={LayoutGridIcon} label="Dashboard" /></div>
                <div className="flex-1 h-full"><NavItem page="reports" icon={ListBulletIcon} label="Laporan" /></div>
                <div className="relative w-16 h-full flex justify-center z-10">
                    <button onClick={onOpenMenu} className="absolute -top-6 w-14 h-14 bg-primary-navy rounded-full shadow-lg shadow-primary-navy/40 flex items-center justify-center transform transition-transform active:scale-95 border-4 border-white group">
                        <Squares2x2Icon className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                    <span className="absolute bottom-4 text-[10px] font-bold text-secondary-gray pointer-events-none">Menu</span>
                </div>
                {/* Visualizations is Level 4 */}
                <div className="flex-1 h-full"><NavItem page="visualizations" icon={ChartBarIcon} label="Grafik" lockKey="visualizations" /></div>
                <div className="flex-1 h-full"><NavItem page="missions" icon={FireIcon} label="Misi" /></div>
            </nav>
        </div> 
    );
}

export const MainMenu: React.FC<{ 
    onNavigate: (page: Page) => void, 
    onShowInfo: () => void, 
    onManageFunds: () => void, 
    onScanReceipt: () => void, 
    onSmartInput: () => void, 
    onVoiceInput: () => void, 
    onAskAI: () => void, 
    onGetAIAdvice: () => void, 
    onOpenSettings: () => void, 
    onOpenDailyBonus: () => void, 
    onOpenDebt: () => void,
    userLevel: number 
}> = (props) => {
    
    // Helper to check locks
    const isLocked = (key: string) => {
        const req = FEATURE_UNLOCK_LEVELS[key];
        return req ? props.userLevel < req : false;
    };

    const menuItems = [ 
        { icon: PaintBrushIcon, label: 'Kustomisasi', action: () => props.onNavigate('customApp'), disabled: isLocked('customApp'), lockKey: 'customApp' }, 
        { icon: CreditCardIcon, label: 'Langganan', action: () => props.onNavigate('subscriptions'), disabled: isLocked('subscriptions'), lockKey: 'subscriptions' }, 
        { icon: BuildingLibraryIcon, label: 'Celengan', action: () => props.onNavigate('savings'), disabled: isLocked('savings'), lockKey: 'savings' }, 
        { icon: ShoppingCartIcon, label: 'Belanja', action: () => props.onNavigate('shoppingList'), disabled: isLocked('shoppingList'), lockKey: 'shoppingList' }, 
        { icon: HeartIcon, label: 'Wishlist', action: () => props.onNavigate('wishlist'), disabled: isLocked('wishlist'), lockKey: 'wishlist' }, 
        { icon: CircleStackIcon, label: 'Aset', action: () => props.onNavigate('netWorth'), disabled: isLocked('netWorth'), lockKey: 'netWorth' }, 
        { icon: TrophyIcon, label: 'Lencana', action: () => props.onNavigate('achievements'), disabled: false }, 
        { icon: ShoppingBagIcon, label: 'Toko', action: () => props.onNavigate('shop'), disabled: isLocked('shop'), lockKey: 'shop' }, 
        { icon: FireIcon, label: 'Rekor', action: () => props.onNavigate('personalBest'), disabled: isLocked('personalBest'), lockKey: 'personalBest' }, 
        { icon: UserIcon, label: 'Profil', action: () => props.onNavigate('profile'), disabled: false }, 
        { icon: ListBulletIcon, label: 'Info', action: props.onShowInfo, disabled: false }, 
        { icon: DocumentTextIcon, label: 'Dana', action: props.onManageFunds, disabled: false }, 
        
        // AI Features with Cost Indicators (Level 1)
        { icon: CameraIcon, label: 'Scan Struk', action: props.onScanReceipt, disabled: false, cost: AI_COSTS.SCAN_RECEIPT }, 
        { icon: SparklesIcon, label: 'Input Cerdas', action: props.onSmartInput, disabled: false, cost: AI_COSTS.SMART_INPUT }, 
        { icon: LightbulbIcon, label: 'Saran AI', action: props.onGetAIAdvice, disabled: false, cost: AI_COSTS.AI_ADVICE }, 
        { icon: ChatBubbleLeftRightIcon, label: 'Tanya AI', action: props.onAskAI, disabled: false, cost: AI_COSTS.CHAT_MESSAGE }, 
        { icon: SpeakerWaveIcon, label: 'Suara', action: props.onVoiceInput, disabled: false, cost: AI_COSTS.VOICE_ASSISTANT_SESSION }, 
        
        { icon: HandRaisedIcon, label: 'Hutang', action: props.onOpenDebt, disabled: isLocked('debt'), lockKey: 'debt' }, 
        { icon: GiftIcon, label: 'Bonus Harian', action: props.onOpenDailyBonus, disabled: false }, 
        { icon: Cog6ToothIcon, label: 'Pengaturan', action: props.onOpenSettings, disabled: false }, 
    ];
    
    return ( 
        <div className="grid grid-cols-4 gap-3 p-2">
            {menuItems.map((item, idx) => {
                const reqLevel = item.lockKey ? FEATURE_UNLOCK_LEVELS[item.lockKey] : 0;
                
                return (
                    <button 
                        key={idx} 
                        onClick={item.action} 
                        disabled={item.disabled} 
                        className={`
                            relative flex flex-col items-center justify-center p-3 rounded-xl 
                            transition-all active:scale-95 space-y-2 border 
                            ${item.disabled 
                                ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed' 
                                : 'bg-gray-50 hover:bg-gray-100 border-gray-100'
                            }
                        `} 
                        title={item.disabled ? `Terbuka di Level ${reqLevel}` : ''}
                    >
                        <div className="relative">
                            <item.icon className={`w-7 h-7 ${item.disabled ? 'text-gray-400' : (item.cost ? 'text-indigo-600' : 'text-primary-navy')}`} />
                            
                            {/* Lock Badge */}
                            {item.disabled && (
                                <div className="absolute -top-1 -right-1 bg-gray-600 rounded-full p-0.5 border border-white">
                                    <LockClosedIcon className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                        
                        {/* Cost Badge for AI Features */}
                        {item.cost && !item.disabled && (
                            <div className="absolute -top-1 -right-1 bg-indigo-100 text-indigo-700 text-[8px] font-black px-1.5 py-0.5 rounded-full border border-indigo-200 shadow-sm flex items-center gap-0.5">
                                <SparklesIcon className="w-2 h-2" />
                                {item.cost}
                            </div>
                        )}
                        
                        <span className="text-[10px] font-medium text-center text-secondary-gray leading-tight">
                            {item.disabled ? `Lv ${reqLevel}` : item.label}
                        </span>
                    </button>
                );
            })}
        </div> 
    );
};
