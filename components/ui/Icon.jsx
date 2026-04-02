import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Icon component to centrally manage lucide-react icons.
 * Usage: <Icon name="TrendingUp" className="w-4 h-4" />
 */
const Icon = ({ name, className, ...props }) => {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <LucideIcon className={cn('w-5 h-5', className)} {...props} />;
};

export default Icon;
