package com.example.kasakportfolio.ui.screens

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
import androidx.compose.material.icons.filled.BusinessCenter
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.Verified
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.WorkspacePremium
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.example.kasakportfolio.model.CertificationItem
import com.example.kasakportfolio.model.EducationItem
import com.example.kasakportfolio.model.PortfolioDataSource
import com.example.kasakportfolio.model.WorkExperience
import com.example.kasakportfolio.ui.theme.AccentCyan
import com.example.kasakportfolio.ui.theme.AccentGreen
import com.example.kasakportfolio.ui.theme.AccentYellow
import com.example.kasakportfolio.ui.theme.CardBackground
import com.example.kasakportfolio.ui.theme.CardBorder
import com.example.kasakportfolio.ui.theme.PrimaryBlue
import com.example.kasakportfolio.ui.theme.PrimaryBlueLight
import com.example.kasakportfolio.ui.theme.Slate300
import com.example.kasakportfolio.ui.theme.Slate400
import com.example.kasakportfolio.ui.theme.Slate800
import com.example.kasakportfolio.ui.theme.Slate900

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ExperienceScreen(
    modifier: Modifier = Modifier
) {
    var selectedCertificate by remember { mutableStateOf<CertificationItem?>(null) }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate900)
            .testTag("experience_screen_content")
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(8.dp))
            SectionHeader(
                title = "Work Experience",
                subtitle = "Data analytics, remote audit engineering & technical instruction"
            )
        }

        items(PortfolioDataSource.workExperiences) { experience ->
            WorkExperienceCard(experience = experience)
        }

        item {
            SectionHeader(
                title = "Education",
                subtitle = "Academic credentials and university honors"
            )
        }

        items(PortfolioDataSource.education) { edu ->
            EducationCard(education = edu)
        }

        item {
            SectionHeader(
                title = "Certificates & Achievements",
                subtitle = "GATE 2026, UGC NET, NPTEL Elite & IBM credentials"
            )
        }

        items(PortfolioDataSource.certifications) { cert ->
            CertificationCard(
                certification = cert,
                onClick = { selectedCertificate = cert }
            )
        }

        item {
            SectionHeader(
                title = "Beyond Work",
                subtitle = "Leadership, hackathon mentorship & volunteer initiatives"
            )
        }

        item {
            LeadershipCard()
            Spacer(modifier = Modifier.height(24.dp))
        }
    }

    selectedCertificate?.let { cert ->
        CertificatePreviewDialog(
            certification = cert,
            onDismiss = { selectedCertificate = null }
        )
    }
}

@Composable
fun WorkExperienceCard(experience: WorkExperience) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .testTag("work_experience_${experience.company.replace(" ", "_").lowercase()}"),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, PrimaryBlue.copy(alpha = 0.5f))))
    ) {
        Column(modifier = Modifier.padding(18.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(PrimaryBlue.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.BusinessCenter, contentDescription = null, tint = PrimaryBlue, modifier = Modifier.size(20.dp))
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(experience.title, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        Text(experience.company, fontSize = 13.sp, color = PrimaryBlueLight, fontWeight = FontWeight.Medium)
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.CalendarToday, contentDescription = null, tint = Slate400, modifier = Modifier.size(13.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text(experience.period, fontSize = 12.sp, color = Slate400)
                Spacer(modifier = Modifier.width(12.dp))
                Icon(Icons.Default.LocationOn, contentDescription = null, tint = Slate400, modifier = Modifier.size(13.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text(experience.location, fontSize = 12.sp, color = Slate400)
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = experience.description,
                fontSize = 13.sp,
                color = Slate300,
                lineHeight = 18.sp
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text("Key Responsibilities & Highlights:", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = AccentCyan)
            Spacer(modifier = Modifier.height(6.dp))

            experience.achievements.forEach { achievement ->
                Row(
                    modifier = Modifier.padding(vertical = 3.dp),
                    verticalAlignment = Alignment.Top
                ) {
                    Box(
                        modifier = Modifier
                            .padding(top = 6.dp)
                            .size(6.dp)
                            .clip(CircleShape)
                            .background(AccentCyan)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(achievement, fontSize = 12.sp, color = Slate300, lineHeight = 17.sp)
                }
            }
        }
    }
}

@Composable
fun EducationCard(education: EducationItem) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .testTag("education_card"),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, AccentGreen.copy(alpha = 0.4f))))
    ) {
        Column(modifier = Modifier.padding(18.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(AccentGreen.copy(alpha = 0.2f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.School, contentDescription = null, tint = AccentGreen, modifier = Modifier.size(20.dp))
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(education.title, fontSize = 15.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    Text(education.institution, fontSize = 12.sp, color = AccentGreen, fontWeight = FontWeight.Medium)
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.CalendarToday, contentDescription = null, tint = Slate400, modifier = Modifier.size(13.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text(education.period, fontSize = 12.sp, color = Slate400)
                Spacer(modifier = Modifier.width(12.dp))
                Icon(Icons.Default.LocationOn, contentDescription = null, tint = Slate400, modifier = Modifier.size(13.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text(education.location, fontSize = 12.sp, color = Slate400)
            }

            Spacer(modifier = Modifier.height(10.dp))
            Text(education.description, fontSize = 13.sp, color = Slate300, lineHeight = 18.sp)

            Spacer(modifier = Modifier.height(8.dp))
            education.achievements.forEach { achievement ->
                Row(
                    modifier = Modifier.padding(vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Default.Verified, contentDescription = null, tint = AccentGreen, modifier = Modifier.size(14.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(achievement, fontSize = 12.sp, color = Slate300)
                }
            }
        }
    }
}

@Composable
fun CertificationCard(
    certification: CertificationItem,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .testTag("cert_${certification.issuer.lowercase()}"),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, AccentYellow.copy(alpha = 0.4f))))
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(AccentYellow.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.WorkspacePremium, contentDescription = null, tint = AccentYellow, modifier = Modifier.size(24.dp))
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(certification.name, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(certification.issuer, fontSize = 12.sp, color = Slate400)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("•", fontSize = 12.sp, color = Slate400)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(certification.year, fontSize = 12.sp, color = AccentCyan)
                    certification.note?.let { note ->
                        Spacer(modifier = Modifier.width(8.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(AccentGreen.copy(alpha = 0.2f))
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text(note, fontSize = 10.sp, color = AccentGreen, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }

            IconButton(onClick = onClick) {
                Icon(Icons.Default.Visibility, contentDescription = "View certificate", tint = AccentCyan)
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun LeadershipCard() {
    val beyondWorkItems = listOf(
        "Graphics Head, National Service Scheme (NSS)",
        "Codeveda Hackathon Mentor (15+ teams)",
        "Volunteer, Khelo India Para Games"
    )

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, AccentCyan.copy(alpha = 0.3f))))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                "Beyond Work & Community Initiatives",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
            Spacer(modifier = Modifier.height(10.dp))
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                beyondWorkItems.forEach { item ->
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(14.dp))
                            .background(Slate800)
                            .border(1.dp, AccentCyan.copy(alpha = 0.3f), RoundedCornerShape(14.dp))
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Text(item, fontSize = 12.sp, color = AccentCyan, fontWeight = FontWeight.Medium)
                    }
                }
            }
        }
    }
}

@Composable
fun CertificatePreviewDialog(
    certification: CertificationItem,
    onDismiss: () -> Unit
) {
    Dialog(onDismissRequest = onDismiss) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp)
                .testTag("certificate_preview_dialog"),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Slate900)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(certification.name, fontSize = 15.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        Text("${certification.issuer} (${certification.year})", fontSize = 12.sp, color = AccentCyan)
                    }
                    IconButton(onClick = onDismiss) {
                        Icon(Icons.Default.Close, contentDescription = "Close", tint = Slate400)
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                certification.imageRes?.let { resId ->
                    Image(
                        painter = painterResource(id = resId),
                        contentDescription = certification.name,
                        contentScale = ContentScale.Fit,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(280.dp)
                            .clip(RoundedCornerShape(12.dp))
                    )
                } ?: Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(160.dp)
                        .background(Slate800, RoundedCornerShape(12.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Verified Credential: ${certification.name}", color = Slate300, fontSize = 13.sp)
                }
            }
        }
    }
}
