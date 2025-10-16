import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
      className="relative"
      data-testid="button-language-toggle"
    >
      <Languages className="h-5 w-5" />
      <span className="absolute -bottom-1 -right-1 text-[10px] font-bold px-1 rounded bg-accent text-accent-foreground">
        {language.toUpperCase()}
      </span>
    </Button>
  );
}
