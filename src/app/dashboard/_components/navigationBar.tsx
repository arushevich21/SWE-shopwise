import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@heroui/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { searchDatabase } from '../../api/grocery/route.ts'
import Link from 'next/link';

interface NavigationBarProps {
  query: string;
  setQuery: (query: string) => void;
  fetchData: (query: string) => void;
}

export default function NavigationBar({query, setQuery, fetchData}: NavigationBarProps) {

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData(query);
    }
  };
  
  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <FontAwesomeIcon className="mr-4" size="lg" icon={faPiggyBank} />
          <p className="hidden sm:block font-bold text-inherit">ShopWise</p>
        </NavbarBrand>
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<FontAwesomeIcon icon={faSearch} />}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Dropdown className="ml-4" placement="bottom-end">
          <DropdownTrigger>
            <FontAwesomeIcon icon={faUserCircle} size="xl" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem asChild>
              <Link key="login" href="/login" className="text-black hover:bg-green-600 w-full block px-4 py-2 rounded-md">Login</Link>
            </DropdownItem>
            <DropdownItem asChild>
              <Link key="register" href="/register" className="text-black hover:bg-green-600 w-full block px-4 py-2 rounded-md">Register</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}