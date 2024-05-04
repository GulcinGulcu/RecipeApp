import './styles.css';

interface HamburgerMenuProps {
    open: boolean;
    setOpen: any;
}

export const HamburgerMenu = ({ open, setOpen }: HamburgerMenuProps) => {
    return (
        <>
            <div className="hamburger-menu-container" onClick={() => setOpen(!open)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}