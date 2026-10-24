package com.example.kasakportfolio.ui.theme

import android.app.Activity
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = PrimaryBlueLight,
    onPrimary = Slate950,
    primaryContainer = Slate800,
    onPrimaryContainer = Slate100,
    secondary = AccentCyanLight,
    onSecondary = Slate950,
    secondaryContainer = Slate800,
    onSecondaryContainer = AccentCyanLight,
    tertiary = AccentPurpleLight,
    onTertiary = Slate950,
    background = Slate900,
    onBackground = Slate100,
    surface = CardBackground,
    onSurface = Slate100,
    surfaceVariant = Slate800,
    onSurfaceVariant = Slate300,
    outline = CardBorder
)

@Composable
fun KasakPortfolioTheme(
    content: @Composable () -> Unit
) {
    val colorScheme = DarkColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = Slate900.toArgb()
            window.navigationBarColor = Slate900.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
