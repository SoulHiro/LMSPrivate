import type React from "react";
import type { ElementType, ReactNode } from "react";

/**
 * PageContainer Component
 *
 * Um componente wrapper que garante:
 * - Base da página com largura total (1920px como referência)
 * - Conteúdo centralizado com largura máxima de 1440px
 * - Padding lateral responsivo
 * - Flexibilidade para diferentes elementos HTML
 *
 * @param children
 * @param className
 * @param bgClassName
 * @param as - Elemento HTML a ser usado como wrapper (padrão: 'div')
 * @param fullWidth - Se true, o conteúdo ocupa toda a largura disponível
 */
interface PageContainerProps {
  children: ReactNode;
  className?: string;
  bgClassName?: string;
  as?: ElementType;
  fullWidth?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
  bgClassName = "",
  as: Component = "div",
  fullWidth = false,
}) => {
  return (
    <Component className={`w-full ${bgClassName}`}>
      <div
        className={`
          ${fullWidth ? "w-full" : "container mx-auto max-w-[1440px]"} 
          p-4 sm:p-6 lg:p-8
          ${className}
        `}
      >
        {children}
      </div>
    </Component>
  );
};
