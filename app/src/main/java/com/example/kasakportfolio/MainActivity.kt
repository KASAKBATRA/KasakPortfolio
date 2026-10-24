package com.example.kasakportfolio

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.Crossfade
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import com.example.kasakportfolio.ui.components.PortfolioBottomNav
import com.example.kasakportfolio.ui.components.PortfolioScreen
import com.example.kasakportfolio.ui.components.PortfolioTopBar
import com.example.kasakportfolio.ui.screens.CampusHireDetailScreen
import com.example.kasakportfolio.ui.screens.ContactDialog
import com.example.kasakportfolio.ui.screens.ExperienceScreen
import com.example.kasakportfolio.ui.screens.HomeScreen
import com.example.kasakportfolio.ui.screens.ProjectsScreen
import com.example.kasakportfolio.ui.screens.SkillsScreen
import com.example.kasakportfolio.ui.theme.KasakPortfolioTheme
import com.example.kasakportfolio.ui.theme.Slate900

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            KasakPortfolioTheme {
                PortfolioApp()
            }
        }
    }
}

@Composable
fun PortfolioApp() {
    val context = LocalContext.current
    var currentScreen by remember { mutableStateOf(PortfolioScreen.HOME) }
    var isCampusHireDetailOpen by remember { mutableStateOf(false) }
    var showContactDialog by remember { mutableStateOf(false) }

    if (isCampusHireDetailOpen) {
        CampusHireDetailScreen(
            onBack = { isCampusHireDetailOpen = false }
        )
    } else {
        Scaffold(
            modifier = Modifier
                .fillMaxSize()
                .testTag("portfolio_scaffold"),
            containerColor = Slate900,
            topBar = {
                PortfolioTopBar(
                    title = currentScreen.title,
                    onContactClick = { showContactDialog = true },
                    onShareClick = {
                        val sendIntent = Intent().apply {
                            action = Intent.ACTION_SEND
                            putExtra(
                                Intent.EXTRA_TEXT,
                                "Check out Kasak's AI & Data Science Portfolio — projects, publications, and machine learning research!"
                            )
                            type = "text/plain"
                        }
                        context.startActivity(Intent.createChooser(sendIntent, "Share Kasak Portfolio"))
                    }
                )
            },
            bottomBar = {
                PortfolioBottomNav(
                    currentScreen = currentScreen,
                    onScreenSelected = { screen ->
                        currentScreen = screen
                    }
                )
            }
        ) { innerPadding ->
            Crossfade(
                targetState = currentScreen,
                label = "screen_crossfade",
                modifier = Modifier.padding(innerPadding)
            ) { screen ->
                when (screen) {
                    PortfolioScreen.HOME -> HomeScreen(
                        onNavigate = { currentScreen = it },
                        onContactClick = { showContactDialog = true }
                    )
                    PortfolioScreen.EXPERIENCE -> ExperienceScreen()
                    PortfolioScreen.SKILLS -> SkillsScreen()
                    PortfolioScreen.PROJECTS -> ProjectsScreen(
                        onOpenCampusHireDetail = { isCampusHireDetailOpen = true }
                    )
                }
            }
        }
    }

    if (showContactDialog) {
        ContactDialog(
            onDismiss = { showContactDialog = false }
        )
    }
}
