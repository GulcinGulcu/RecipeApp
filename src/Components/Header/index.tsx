import { SearchBar } from "../../modules/recipes/SearchBar";
import { Logo } from "../Logo";
import { Navbar } from "../Navbar";
import { HamburgerMenu } from "../Navbar/HamburgerMenu";
import { useState } from "react";
import './styles.css';

interface HeaderProps {
    setRecipes: any;
    setSearchError: any;
}

export const Header = ({ setRecipes, setSearchError }: HeaderProps) => {
    const [open, setOpen] = useState<boolean>(false);
  
    return (
        <header>
            <div className="nav-container">
                <HamburgerMenu setOpen={setOpen} open={open} />
                <Navbar open={open} />
                <SearchBar setSearchError={setSearchError}  setRecipes={setRecipes} />
            </div>
            <Logo />
        </header>
    )
}