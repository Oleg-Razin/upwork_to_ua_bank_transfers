interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'primary' | 'secondary' | 'black' | 'gray' | 'transparent';
}

const Section = ({ 
  children, 
  className = '',
  padding = 'lg',
  background = 'white'
}: SectionProps) => {
  const paddingStyles = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-20',
    xl: 'py-32'
  };
  
  const backgroundStyles = {
    white: 'bg-white',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    black: 'bg-black',
    gray: 'bg-gray-50',
    transparent: ''
  };
  
  return (
    <section className={`
      ${paddingStyles[padding]}
      ${backgroundStyles[background]}
      ${className}
    `}>
      {children}
    </section>
  );
};

export default Section;