import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  // Navigation & Actions
  HomeIcon,
  UserIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  CheckIcon,
  
  // Media & Music
  PlayIcon,
  PauseIcon,
  StopIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MusicalNoteIcon,
  MicrophoneIcon,
  RadioIcon,
  
  // Business & Finance
  CurrencyDollarIcon,
  BanknotesIcon,
  CreditCardIcon,
  ChartBarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  
  // Communication
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  
  // Files & Documents
  DocumentIcon,
  DocumentTextIcon,
  FolderIcon,
  CloudArrowUpIcon,
  CloudArrowDownIcon,
  
  // Status & Alerts
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  
  // Users & People
  UsersIcon,
  UserGroupIcon,
  UserPlusIcon,
  
  // System & Settings
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  LockOpenIcon,
  
  // Time & Calendar
  CalendarIcon,
  ClockIcon,
  
  // Location & Maps
  MapPinIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

import {
  // Solid versions for filled states
  HomeIcon as HomeSolidIcon,
  UserIcon as UserSolidIcon,
  BellIcon as BellSolidIcon,
  PlayIcon as PlaySolidIcon,
  PauseIcon as PauseSolidIcon,
  MusicalNoteIcon as MusicalNoteSolidIcon,
  CheckCircleIcon as CheckCircleSolidIcon,
  ExclamationCircleIcon as ExclamationCircleSolidIcon,
  InformationCircleIcon as InformationCircleSolidIcon,
  XCircleIcon as XCircleSolidIcon,
} from '@heroicons/react/24/solid';

// Icon mapping for easy access
export const iconMap = {
  // Navigation & Actions
  home: HomeIcon,
  'home-solid': HomeSolidIcon,
  user: UserIcon,
  'user-solid': UserSolidIcon,
  settings: CogIcon,
  bell: BellIcon,
  'bell-solid': BellSolidIcon,
  search: MagnifyingGlassIcon,
  plus: PlusIcon,
  edit: PencilIcon,
  delete: TrashIcon,
  view: EyeIcon,
  hide: EyeSlashIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-down': ArrowDownIcon,
  'chevron-up': ChevronUpIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  close: XMarkIcon,
  check: CheckIcon,
  
  // Media & Music
  play: PlayIcon,
  'play-solid': PlaySolidIcon,
  pause: PauseIcon,
  'pause-solid': PauseSolidIcon,
  stop: StopIcon,
  'volume-up': SpeakerWaveIcon,
  'volume-off': SpeakerXMarkIcon,
  music: MusicalNoteIcon,
  'music-solid': MusicalNoteSolidIcon,
  microphone: MicrophoneIcon,
  radio: RadioIcon,
  
  // Business & Finance
  dollar: CurrencyDollarIcon,
  money: BanknotesIcon,
  'credit-card': CreditCardIcon,
  'chart-bar': ChartBarIcon,
  'chart-pie': ChartPieIcon,
  'trending-up': ArrowTrendingUpIcon,
  'trending-down': ArrowTrendingDownIcon,
  
  // Communication
  email: EnvelopeIcon,
  phone: PhoneIcon,
  chat: ChatBubbleLeftRightIcon,
  
  // Files & Documents
  document: DocumentIcon,
  'document-text': DocumentTextIcon,
  folder: FolderIcon,
  upload: CloudArrowUpIcon,
  download: CloudArrowDownIcon,
  
  // Status & Alerts
  warning: ExclamationTriangleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
  'info-solid': InformationCircleSolidIcon,
  success: CheckCircleIcon,
  'success-solid': CheckCircleSolidIcon,
  'error-solid': XCircleSolidIcon,
  
  // Users & People
  users: UsersIcon,
  'user-group': UserGroupIcon,
  'user-plus': UserPlusIcon,
  
  // System & Settings
  'settings-gear': Cog6ToothIcon,
  adjustments: AdjustmentsHorizontalIcon,
  shield: ShieldCheckIcon,
  lock: LockClosedIcon,
  unlock: LockOpenIcon,
  
  // Time & Calendar
  calendar: CalendarIcon,
  clock: ClockIcon,
  
  // Location & Maps
  'map-pin': MapPinIcon,
  globe: GlobeAltIcon,
} as const;

export type IconName = keyof typeof iconMap;

const iconVariants = cva('', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10',
    },
    color: {
      default: 'text-text dark:text-text',
      primary: 'text-primary dark:text-primary',
      secondary: 'text-secondary dark:text-secondary',
      muted: 'text-text-secondary dark:text-text-secondary',
      success: 'text-success dark:text-success',
      warning: 'text-warning dark:text-warning',
      error: 'text-error dark:text-error',
      info: 'text-info dark:text-info',
      white: 'text-white',
      inherit: 'text-inherit',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  name: IconName;
  'aria-label'?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size,
  color,
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <IconComponent
      className={cn(iconVariants({ size, color }), className)}
      aria-label={ariaLabel || name}
      {...props}
    />
  );
};

export default Icon;