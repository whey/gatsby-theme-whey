import { FC } from 'react';
interface SwatchProps {
    title: string;
    darkmode?: boolean;
    colors?: string;
    colornames?: string;
    grid?: 'sudoku';
}
declare const Swatch: FC<SwatchProps>;
export default Swatch;
