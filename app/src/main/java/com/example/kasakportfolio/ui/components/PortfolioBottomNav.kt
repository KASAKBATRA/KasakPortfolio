package com.example.kasakportfolio.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BusinessCenter
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import com.example.kasakportfolio.ui.theme.AccentCyan
import com.example.kasakportfolio.ui.theme.PrimaryBlue
import com.example.kasakportfolio.ui.theme.Slate400
import com.example.kasakportfolio.ui.theme.Slate900
import com.example.kasakportfolio.ui.theme.Slate950

enum class PortfolioScreen(val title: String) {
    HOME("Home"),
    EXPERIENCE("Experience"),
    SKILLS("Skills"),
    PROJECTS("Projects")
}

@Composable
fun PortfolioBottomNav(
    currentScreen: PortfolioScreen,
    onScreenSelected: (PortfolioScreen) -> Unit,
    modifier: Modifier = Modifier
) {
    NavigationBar(
        modifier = modifier.testTag("portfolio_bottom_nav"),
        containerColor = Slate950,
        contentColor = Slate400
    ) {
        val items = listOf(
            Triple(PortfolioScreen.HOME, Icons.Default.Home, "nav_home"),
            Triple(PortfolioScreen.EXPERIENCE, Icons.Default.BusinessCenter, "nav_experience"),
            Triple(PortfolioScreen.SKILLS, Icons.Default.Psychology, "nav_skills"),
            Triple(PortfolioScreen.PROJECTS, Icons.Default.Code, "nav_projects")
        )

        items.forEach { (screen, icon, testTag) ->
            val selected = currentScreen == screen
            NavigationBarItem(
                modifier = Modifier.testTag(testTag),
                selected = selected,
                onClick = { onScreenSelected(screen) },
                icon = { Icon(icon, contentDescription = screen.title) },
                label = { Text(screen.title) },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = AccentCyan,
                    selectedTextColor = AccentCyan,
                    unselectedIconColor = Slate400,
                    unselectedTextColor = Slate400,
                    indicatorColor = Slate900
                )
            )
        }
    }
}
