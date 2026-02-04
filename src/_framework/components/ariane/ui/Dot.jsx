/**
 * @component Dot
 * @description Small circular indicator for status or notifications.
 * 
 * @source maze-monorepo/packages/ariane/src/components/Dot/Dot.tsx
 * @tokens maze-monorepo/packages/ariane/src/theme/colors.ts
 */
import { forwardRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Color token mapping for Dot component
 */
const colorMap = {
  amber100: '#FFF9ED',
  amber200: '#FFEED1',
  amber300: '#FCD78D',
  amber400: '#D29615',
  amber500: '#AC7000',
  amber600: '#8C5400',
  amber700: '#6B3E00',
  amber800: '#4B2800',
  blue100: '#F0FAFF',
  blue200: '#CEEEFF',
  blue300: '#9AD6FF',
  blue400: '#3B9FEC',
  blue500: '#0568FD',
  blue600: '#034FD6',
  blue700: '#0138A9',
  blue800: '#012577',
  cyan100: '#DEFFFE',
  cyan200: '#BBF4F3',
  cyan300: '#81DDE7',
  cyan400: '#2BA7B8',
  cyan500: '#147E90',
  cyan600: '#016479',
  cyan700: '#024A5A',
  cyan800: '#02323D',
  forest100: '#EBFCF5',
  forest200: '#BCFAE0',
  forest300: '#87DEBA',
  forest400: '#38A97A',
  forest500: '#158053',
  forest600: '#00673C',
  forest700: '#024C2D',
  forest800: '#01341F',
  lavender100: '#F9F7FF',
  lavender200: '#E7E7FF',
  lavender300: '#CCCAFF',
  lavender400: '#928BFF',
  lavender500: '#6B5BEE',
  lavender600: '#5247C8',
  lavender700: '#3A30A4',
  lavender800: '#1F1C7F',
  lila100: '#FCF7FF',
  lila200: '#F3E3FF',
  lila300: '#E5C2FE',
  lila400: '#C576F9',
  lila500: '#9C48E0',
  lila600: '#7C2FC7',
  lila700: '#6215A0',
  lila800: '#450773',
  neutral000: '#FFFFFF',
  neutral100: '#F8F8FB',
  neutral200: '#E8E8F1',
  neutral300: '#CDCEDD',
  neutral400: '#9597B0',
  neutral500: '#6C718C',
  neutral600: '#535A74',
  neutral700: '#3D425A',
  neutral800: '#282D40',
  neutral900: '#000000',
  red100: '#FFF6F8',
  red200: '#FEE3E5',
  red300: '#FCC0C3',
  red400: '#F86C74',
  red500: '#CC3F4D',
  red600: '#A4313C',
  red700: '#7D222B',
  red800: '#57151F',
  rose100: '#FFF6FE',
  rose200: '#FFE0FC',
  rose300: '#FCB9F7',
  rose400: '#E46ADA',
  rose500: '#BB3DB0',
  rose600: '#982D8E',
  rose700: '#7A1070',
  rose800: '#56054F',
  sand100: '#f5f4f0',
  sand200: '#eae6e1',
  sand300: '#d2cec6',
  sand400: '#9e9b94',
  sand500: '#73726f',
  sand600: '#595959',
  sand700: '#383838',
  sand800: '#1c1c1c',
  lime100: '#f9ffdb',
  lime200: '#dffd86',
  lime300: '#bbe510',
  lime400: '#8aa80a',
  lime500: '#607f10',
  lime600: '#465f0c',
  lime700: '#2b4909',
  lime800: '#1e3206',
};

const getColorValue = (color) => colorMap[color] || color;

/**
 * Dot component - Ariane design system port
 * A simple circular indicator
 * 
 * @param {object} props - Component props
 * @param {number} [props.size=8] - Dot size in pixels
 * @param {string} [props.color='blue500'] - Dot color (Ariane token or CSS color)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 */
const Dot = forwardRef(function Dot(
  {
    size = 8,
    color = 'blue500',
    className,
    ...props
  },
  ref
) {
  const colorValue = getColorValue(color);

  return (
    <div
      ref={ref}
      className={cn('rounded-full', className)}
      style={{
        backgroundColor: colorValue,
        width: `${size}px`,
        height: `${size}px`,
      }}
      {...props}
    />
  );
});

Dot.displayName = 'Dot';

export { Dot };

