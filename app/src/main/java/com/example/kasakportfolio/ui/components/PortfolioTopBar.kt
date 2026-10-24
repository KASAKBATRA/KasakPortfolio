package com.example.kasakportfolio.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Mail
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.kasakportfolio.R
import com.example.kasakportfolio.ui.theme.AccentCyan
import com.example.kasakportfolio.ui.theme.PrimaryBlue
import com.example.kasakportfolio.ui.theme.Slate100
import com.example.kasakportfolio.ui.theme.Slate900
import com.example.kasakportfolio.ui.theme.Slate950

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PortfolioTopBar(
    title: String,
    onContactClick: () -> Unit,
    onShareClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    TopAppBar(
        modifier = modifier.testTag("portfolio_top_bar"),
        title = {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(
                            Brush.linearGradient(
                                colors = listOf(PrimaryBlue, AccentCyan)
                            )
                        )
                        .padding(2.dp)
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.kasak_profile),
                        contentDescription = "Kasak Avatar",
                        modifier = Modifier
                            .size(32.dp)
                            .clip(CircleShape)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Text(
                    text = "KASAK",
                    color = Slate100,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
            }
        },
        actions = {
            IconButton(
                onClick = onContactClick,
                modifier = Modifier.testTag("action_contact")
            ) {
                Icon(
                    imageVector = Icons.Default.Mail,
                    contentDescription = "Contact Kasak",
                    tint = AccentCyan
                )
            }
            IconButton(
                onClick = onShareClick,
                modifier = Modifier.testTag("action_share")
            ) {
                Icon(
                    imageVector = Icons.Default.Share,
                    contentDescription = "Share Profile",
                    tint = Slate100
                )
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = Slate950,
            titleContentColor = Slate100
        )
    )
}
