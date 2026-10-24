package com.example.kasakportfolio.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.OpenInNew
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.kasakportfolio.R
import com.example.kasakportfolio.ui.theme.AccentCyan
import com.example.kasakportfolio.ui.theme.AccentGreen
import com.example.kasakportfolio.ui.theme.AccentPink
import com.example.kasakportfolio.ui.theme.CardBackground
import com.example.kasakportfolio.ui.theme.CardBorder
import com.example.kasakportfolio.ui.theme.PrimaryBlue
import com.example.kasakportfolio.ui.theme.Slate200
import com.example.kasakportfolio.ui.theme.Slate300
import com.example.kasakportfolio.ui.theme.Slate400
import com.example.kasakportfolio.ui.theme.Slate800
import com.example.kasakportfolio.ui.theme.Slate900
import com.example.kasakportfolio.ui.theme.Slate950

@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun CampusHireDetailScreen(
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    BackHandler { onBack() }
    val context = LocalContext.current

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate900)
            .testTag("campushire_detail_screen")
    ) {
        TopAppBar(
            title = { Text("CampusHire Analytics", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color.White) },
            navigationIcon = {
                IconButton(onClick = onBack, modifier = Modifier.testTag("btn_back_campushire")) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                }
            },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = Slate950)
        )

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(4.dp))
                // Hero Banner
                Image(
                    painter = painterResource(id = R.drawable.campushire_hero),
                    contentDescription = "CampusHire Hero",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp)
                        .clip(RoundedCornerShape(16.dp))
                )
            }

            item {
                Text(
                    text = "Smart Placement Management System",
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Text(
                    text = "Role-based verified placement ecosystem developed during DRDO internship",
                    fontSize = 13.sp,
                    color = AccentCyan
                )
            }

            item {
                DetailSectionCard(
                    title = "The Problem",
                    body = "College placement processes traditionally suffer from manual verification overhead, repeated document submissions, lack of real-time application tracking, and fragmented communication between students, recruiters, and T&P cells, leading to delayed selections and missed opportunities."
                )
            }

            item {
                DetailSectionCard(
                    title = "The Solution",
                    body = "CampusHire Analytics establishes a role-based, verified environment where Training & Placement officers authenticate credentials, issue unique login IDs, and provide recruiters with pre-screened candidate pools alongside real-time placement rate charts."
                )
            }

            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = CardBackground),
                    border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, AccentCyan.copy(alpha = 0.4f))))
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("Key Features", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        Spacer(modifier = Modifier.height(10.dp))
                        val features = listOf(
                            "Role-based registration for Students, Companies, and T&P Officers",
                            "T&P automated verification & unique login ID authentication",
                            "Skill matrix and CGPA tracking for optimal candidate filtering",
                            "Interactive analytics dashboard visualizing hiring rates and company stats",
                            "Secure applicant database and audit-friendly review workflows"
                        )
                        features.forEach { feat ->
                            Row(modifier = Modifier.padding(vertical = 3.dp), verticalAlignment = Alignment.Top) {
                                Icon(Icons.Default.CheckCircle, contentDescription = null, tint = AccentCyan, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(feat, fontSize = 13.sp, color = Slate200, lineHeight = 18.sp)
                            }
                        }
                    }
                }
            }

            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = CardBackground),
                    border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, AccentGreen.copy(alpha = 0.4f))))
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("Tech Stack", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        Spacer(modifier = Modifier.height(8.dp))
                        val tech = listOf("PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "EmailJS", "Apache")
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            tech.forEach { t ->
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(8.dp))
                                        .background(Slate800)
                                        .border(1.dp, AccentGreen.copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                                        .padding(horizontal = 10.dp, vertical = 4.dp)
                                ) {
                                    Text(t, fontSize = 12.sp, color = AccentGreen, fontWeight = FontWeight.Medium)
                                }
                            }
                        }
                    }
                }
            }

            item {
                DetailSectionCard(
                    title = "Key Achievements",
                    body = "Deployed as an operational pilot for college placement drives; reduced manual verification burden by approximately 70%; successfully showcased at technical symposiums and academic exhibitions."
                )
            }

            item {
                DetailSectionCard(
                    title = "Future Roadmap",
                    body = "Planned extensions include AI-powered semantic resume screening with BERT, placement probability prediction algorithms, integrated real-time recruiter chat, and Power BI telemetry feeds."
                )
            }

            item {
                Button(
                    onClick = {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/KASAKBATRA/CampusHire_Analytics"))
                        context.startActivity(intent)
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                        .testTag("btn_campushire_github"),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = AccentPink)
                ) {
                    Icon(Icons.Default.Code, contentDescription = null, modifier = Modifier.size(18.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("View Source Code on GitHub", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    Spacer(modifier = Modifier.width(6.dp))
                    Icon(Icons.Default.OpenInNew, contentDescription = null, modifier = Modifier.size(14.dp))
                }
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}

@Composable
fun DetailSectionCard(title: String, body: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, PrimaryBlue.copy(alpha = 0.3f))))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(title, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
            Spacer(modifier = Modifier.height(6.dp))
            Text(body, fontSize = 13.sp, color = Slate300, lineHeight = 19.sp)
        }
    }
}
