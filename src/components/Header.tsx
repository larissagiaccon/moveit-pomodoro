import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';

import styles from '../styles/components/Header.module.css'
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { colors, title } = useContext(ThemeContext);
   
  const { ToggleTheme, theme } = useTheme();

  function handleToggle() {
    ToggleTheme();
  }

  return (
    <div className={styles.container}>
      <img src='logo-full.svg' alt="Logo"/>
      <div className={styles.toogleButton}>
        <Switch
          onChange={handleToggle}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          onHandleColor={colors.primary}
          offHandleColor={colors.secundary}
          offColor={shade(0.0, colors.primary)}  // esquerda
          onColor={colors.secundary}              // direita
        />
      </div>
    </div>
  );
};

export default Header;