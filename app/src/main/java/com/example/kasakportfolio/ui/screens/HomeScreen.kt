package com.example.kasakportfolio.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.Mail
import androidx.compose.material.icons.filled.OpenInNew
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.SuggestionChip
import androidx.compose.material3.SuggestionChipDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.kasakportfolio.R
import com.example.kasakportfolio.model.MilestoneItem
import com.example.kasakportfolio.model.PortfolioDataSource
import com.example.kasakportfolio.ui.components.PortfolioScreen
import com.example.kasakportfolio.ui.theme.AccentCyan
import com.example.kasakportfolio.ui.theme.AccentGreen
import com.example.kasakportfolio.ui.theme.AccentPink
import com.example.kasakportfolio.ui.theme.AccentPurple
import com.example.kasakportfolio.ui.theme.AccentYellow
import com.example.kasakportfolio.ui.theme.CardBackground
import com.example.kasakportfolio.ui.theme.CardBorder
import com.example.kasakportfolio.ui.theme.PrimaryBlue
import com.example.kasakportfolio.ui.theme.PrimaryBlueLight
import com.example.kasakportfolio.ui.theme.Slate200
import com.example.kasakportfolio.ui.theme.Slate300
import com.example.kasakportfolio.ui.theme.Slate400
import com.example.kasakportfolio.ui.theme.Slate800
import com.example.kasakportfolio.ui.theme.Slate900

@Composable
fun HomeScreen(
    onNavigate: (PortfolioScreen) -> Unit,
    onContactClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate900)
            .testTag("home_screen_content")
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(8.dp))
            HeroCard(
                onSeeMyWork = { onNavigate(PortfolioScreen.PROJECTS) },
                onGetInTouch = onContactClick,
                onDownloadResume = {
                    val intent = Intent(
                        Intent.ACTION_VIEW,
                        Uri.parse("https://portfoliokasak.netlify.app/Kasak_Resume.pdf")
                    )
                    context.startActivity(intent)
                },
                onOpenLinkedIn = {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.linkedin.com/in/kasak-batra/"))
                    context.startActivity(intent)
                },
                onOpenGitHub = {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/KASAKBATRA"))
                    context.startActivity(intent)
                },
                onOpenEmail = {
                    val intent = Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:arorakasak2005@gmail.com"))
                    context.startActivity(Intent.createChooser(intent, "Send Email"))
                }
            )
        }

        item {
            StatCardsRow()
        }

        item {
            SectionHeader(
                title = "Research & Publications",
                subtitle = "Published papers and debut machine learning book"
            )
        }

        items(PortfolioDataSource.milestones) { milestone ->
            MilestoneCard(
                milestone = milestone,
                onClick = {
                    milestone.linkUrl?.let { url ->
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        context.startActivity(intent)
                    }
                }
            )
        }

        item {
            SectionHeader(
                title = "Explore Portfolio",
                subtitle = "Direct access to experience, skills and project work"
            )
        }

        item {
            QuickNavigationRow(onNavigate = onNavigate)
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun HeroCard(
    onSeeMyWork: () -> Unit,
    onGetInTouch: () -> Unit,
    onDownloadResume: () -> Unit,
    onOpenLinkedIn: () -> Unit,
    onOpenGitHub: () -> Unit,
    onOpenEmail: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .testTag("hero_card"),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(PrimaryBlue, AccentCyan)))
    ) {
        Column(
            modifier = Modifier.padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Profile image with glowing ring
            Box(
                modifier = Modifier
                    .size(104.dp)
                    .clip(CircleShape)
                    .background(
                        Brush.sweepGradient(
                            listOf(PrimaryBlue, AccentCyan, AccentPurple, PrimaryBlue)
                        )
                    )
                    .padding(3.dp),
                contentAlignment = Alignment.Center
            ) {
                Image(
                    painter = painterResource(id = R.drawable.kasak_profile),
                    contentDescription = "Kasak Photo",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(98.dp)
                        .clip(CircleShape)
                )
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Office badge
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Slate800)
                    .border(1.dp, CardBorder, RoundedCornerShape(20.dp))
                    .padding(horizontal = 12.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "Office of the Comptroller & Auditor General of India",
                    color = AccentCyan,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "I turn messy data into audit-ready insight.",
                fontSize = 22.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color.White,
                textAlign = TextAlign.Center,
                lineHeight = 28.sp
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "B.Tech graduate in Artificial Intelligence & Data Science, working in data analytics and remote audit at the Office of the Comptroller & Auditor General of India. I also teach, mentor and write about machine learning.",
                fontSize = 13.sp,
                color = Slate300,
                textAlign = TextAlign.Center,
                lineHeight = 19.sp,
                modifier = Modifier.padding(horizontal = 8.dp)
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Action buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Button(
                    onClick = onGetInTouch,
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .testTag("btn_get_in_touch"),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue)
                ) {
                    Text("Get in touch", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }

                Button(
                    onClick = onSeeMyWork,
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .testTag("btn_see_my_work"),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Slate800)
                ) {
                    Text("See my work", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = Color.White)
                }

                OutlinedButton(
                    onClick = onDownloadResume,
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .testTag("btn_download_resume"),
                    shape = RoundedCornerShape(12.dp),
                    border = ButtonDefaults.outlinedButtonBorder.copy(brush = Brush.linearGradient(listOf(AccentCyan, PrimaryBlue)))
                ) {
                    Text("Resume", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = AccentCyan)
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Social links row
            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                SocialIconPill(label = "LinkedIn", color = PrimaryBlue, onClick = onOpenLinkedIn)
                SocialIconPill(label = "GitHub", color = Slate200, onClick = onOpenGitHub)
                SocialIconPill(label = "Email", color = AccentGreen, onClick = onOpenEmail)
            }
        }
    }
}

@Composable
fun StatCardsRow() {
    val stats = listOf(
        Pair("94.5%", "B.Tech, AI & Data Science (2026)"),
        Pair("GATE 2026", "AI & Data Science, qualified"),
        Pair("UGC NET", "Computer Science Applications"),
        Pair("3 papers + 1 book", "published research & authorship")
    )

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        stats.chunked(2).forEach { rowPair ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                rowPair.forEach { (boldText, subText) ->
                    Card(
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(14.dp),
                        colors = CardDefaults.cardColors(containerColor = CardBackground),
                        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, AccentCyan.copy(alpha = 0.3f))))
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(boldText, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = AccentCyan)
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(subText, fontSize = 11.sp, color = Slate300)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun SocialIconPill(
    label: String,
    color: Color,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(20.dp))
            .background(Slate800)
            .border(1.dp, CardBorder, RoundedCornerShape(20.dp))
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 6.dp)
    ) {
        Text(text = label, color = color, fontSize = 12.sp, fontWeight = FontWeight.Medium)
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun MilestoneCard(
    milestone: MilestoneItem,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .testTag("milestone_card_${milestone.id}"),
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, AccentPurple.copy(alpha = 0.5f))))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            milestone.imageRes?.let { resId ->
                Image(
                    painter = painterResource(id = resId),
                    contentDescription = milestone.highlight,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp)
                        .clip(RoundedCornerShape(12.dp))
                )
                Spacer(modifier = Modifier.height(12.dp))
            }

            Text(
                text = milestone.highlight,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = milestone.caption,
                fontSize = 13.sp,
                color = Slate300,
                lineHeight = 18.sp
            )

            Spacer(modifier = Modifier.height(10.dp))

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                milestone.tags.forEach { tag ->
                    SuggestionChip(
                        onClick = {},
                        label = { Text(tag, fontSize = 11.sp, color = AccentPurple) },
                        colors = SuggestionChipDefaults.suggestionChipColors(
                            containerColor = Slate800
                        ),
                        border = SuggestionChipDefaults.suggestionChipBorder(
                            borderColor = AccentPurple.copy(alpha = 0.3f),
                            enabled = true
                        )
                    )
                }
            }

            if (milestone.linkUrl != null) {
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.align(Alignment.End)
                ) {
                    Text(
                        text = "View Publication",
                        fontSize = 12.sp,
                        color = AccentCyan,
                        fontWeight = FontWeight.SemiBold
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Icon(
                        imageVector = Icons.Default.OpenInNew,
                        contentDescription = null,
                        tint = AccentCyan,
                        modifier = Modifier.size(14.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun QuickNavigationRow(onNavigate: (PortfolioScreen) -> Unit) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        QuickNavCard(
            title = "Experience",
            subtitle = "CAG & DICS",
            icon = Icons.Default.AutoAwesome,
            color = PrimaryBlue,
            modifier = Modifier.weight(1f),
            onClick = { onNavigate(PortfolioScreen.EXPERIENCE) }
        )
        QuickNavCard(
            title = "Skills",
            subtitle = "Grouped Pills",
            icon = Icons.Default.Psychology,
            color = AccentCyan,
            modifier = Modifier.weight(1f),
            onClick = { onNavigate(PortfolioScreen.SKILLS) }
        )
        QuickNavCard(
            title = "Projects",
            subtitle = "MapMyWork & More",
            icon = Icons.Default.Star,
            color = AccentPurple,
            modifier = Modifier.weight(1f),
            onClick = { onNavigate(PortfolioScreen.PROJECTS) }
        )
    }
}

@Composable
fun QuickNavCard(
    title: String,
    subtitle: String,
    icon: ImageVector,
    color: Color,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Card(
        modifier = modifier
            .clickable(onClick = onClick)
            .testTag("quick_nav_${title.lowercase()}"),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, color.copy(alpha = 0.4f))))
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Icon(icon, contentDescription = null, tint = color, modifier = Modifier.size(20.dp))
            Spacer(modifier = Modifier.height(8.dp))
            Text(title, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)
            Text(subtitle, fontSize = 10.sp, color = Slate400)
            Spacer(modifier = Modifier.height(4.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("View", fontSize = 11.sp, color = color, fontWeight = FontWeight.SemiBold)
                Icon(Icons.AutoMirrored.Filled.ArrowForward, contentDescription = null, tint = color, modifier = Modifier.size(12.dp))
            }
        }
    }
}

@Composable
fun SectionHeader(title: String, subtitle: String) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Text(
            text = title,
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )
        Text(
            text = subtitle,
            fontSize = 12.sp,
            color = Slate400
        )
        Spacer(modifier = Modifier.height(6.dp))
        Box(
            modifier = Modifier
                .width(48.dp)
                .height(3.dp)
                .clip(RoundedCornerShape(2.dp))
                .background(Brush.linearGradient(listOf(PrimaryBlue, AccentCyan)))
        )
    }
}
