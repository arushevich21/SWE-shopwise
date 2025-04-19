"use client";

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
import { faPiggyBank, faSearch, faUserCircle, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import "./globals.css";
import { useEffect, useState } from "react";
import { supabase } from '@/app/api/lib/util/supabaseClient';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="container-layout">
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar">
          <h1 className="logo">ShopWise</h1>
          <nav className="nav-links flex items-center">
            <a href="/dashboard">Shop</a>
            <a href="#vision">Vision</a>
            <a href="#team">Team</a>
            <a>
            <Dropdown className="ml-4" placement="bottom-end">
              <DropdownTrigger>
                <FontAwesomeIcon icon={faUserCircle} size="xl" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                {user ? (
                  <>
                    <DropdownItem key="user-info" className="opacity-100 cursor-default">
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </DropdownItem>
                    <DropdownItem key="logout" onClick={handleLogout} className="text-red-500">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Logout</span>
                      </div>
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem key="login">
                      <Link href="/login" className="text-black hover:bg-green-600 w-full block px-4 py-2 rounded-md">
                        Login
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="register">
                      <Link href="/register" className="text-black hover:bg-green-600 w-full block px-4 py-2 rounded-md">
                        Register
                      </Link>
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </a>
          </nav>
        </div>
      </header>

      <div className="hero">
        <div className="hero-inner">
          <h2>Beat the Rising Cost of Living</h2>
          <p>
            ShopWise helps you find the best deals across multiple grocery stores in real-time.
            Save money, shop smarter.
          </p>
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>

      <section id="vision" className="section">
        <div className="section-inner">
          <h3>Our Vision</h3>
          <p>For individuals and families struggling with rising grocery prices...</p>
        </div>
      </section>

      <section id="team" className="section section-alt">
        <div className="section-inner">
          <h3>Team Roles</h3>
          <ul>
            <li><strong>Product Manager:</strong> Anton Rushevich</li>
            <li><strong>Scrum Master:</strong> Jack Lohse</li>
            <li><strong>Front End Developer:</strong> Davis Pham</li>
            <li><strong>Back End Developer:</strong> Kirill Sakharov</li>
          </ul>
        </div>
      </section>

      <div id="tech" className="section">
        <div className="section-inner">
          <h3>Technologies</h3>
          <ul>
            <li>HTML, CSS, JavaScript</li>
            <li>ReactJS, NodeJS, ExpressJS</li>
            <li>MySQL</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
