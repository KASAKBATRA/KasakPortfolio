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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.Image as ImageIcon
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.OpenInNew
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.kasakportfolio.R
import com.example.kasakportfolio.model.PortfolioDataSource
import com.example.kasakportfolio.model.ProjectItem
import com.example.kasakportfolio.ui.theme.AccentCyan
import com.example.kasakportfolio.ui.theme.AccentPink
import com.example.kasakportfolio.ui.theme.AccentPurple
import com.example.kasakportfolio.ui.theme.CardBackground
import com.example.kasakportfolio.ui.theme.CardBorder
import com.example.kasakportfolio.ui.theme.PrimaryBlue
import com.example.kasakportfolio.ui.theme.Slate300
import com.example.kasakportfolio.ui.theme.Slate400
import com.example.kasakportfolio.ui.theme.Slate800
import com.example.kasakportfolio.ui.theme.Slate900

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ProjectsScreen(
    onOpenCampusHireDetail: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val categories = listOf("All", "Geospatial", "Analytics", "Audit")
    var selectedCategory by remember { mutableStateOf("All") }

    val filteredProjects = remember(selectedCategory) {
        if (selectedCategory == "All") {
            PortfolioDataSource.projects
        } else {
            PortfolioDataSource.projects.filter { it.category.contains(selectedCategory, ignoreCase = true) }
        }
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate900)
            .testTag("projects_screen_content")
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(8.dp))
            SectionHeader(
                title = "Projects Showcase",
                subtitle = "Workforce mapping, automated audit pipelines, and placement verification"
            )
        }

        // Category Filter Chips
        item {
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth().testTag("filter_chips_row")
            ) {
                items(categories) { cat ->
                    val isSelected = selectedCategory == cat
                    FilterChip(
                        selected = isSelected,
                        onClick = { selectedCategory = cat },
                        label = { Text(cat, fontSize = 12.sp) },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = PrimaryBlue,
                            selectedLabelColor = Color.White,
                            containerColor = Slate800,
                            labelColor = Slate300
                        ),
                        border = FilterChipDefaults.filterChipBorder(
                            borderColor = if (isSelected) PrimaryBlue else CardBorder,
                            selectedBorderColor = PrimaryBlue,
                            enabled = true,
                            selected = isSelected
                        )
                    )
                }
            }
        }

        items(filteredProjects) { project ->
            ProjectCard(
                project = project,
                onOpenCaseStudy = onOpenCampusHireDetail,
                onOpenLiveUrl = {
                    project.liveUrl?.let { url ->
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        context.startActivity(intent)
                    }
                },
                onOpenGithub = {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(project.githubUrl))
                    context.startActivity(intent)
                }
            )
        }

        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/KASAKBATRA"))
                        context.startActivity(intent)
                    }
                    .testTag("btn_view_all_github"),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Slate800),
                border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(PrimaryBlue, AccentCyan)))
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(Icons.Default.Code, contentDescription = null, tint = AccentCyan)
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        "View All Repositories on GitHub (@KASAKBATRA)",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Icon(Icons.Default.OpenInNew, contentDescription = null, tint = AccentCyan, modifier = Modifier.size(14.dp))
                }
            }
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ProjectCard(
    project: ProjectItem,
    onOpenCaseStudy: () -> Unit,
    onOpenLiveUrl: () -> Unit,
    onOpenGithub: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .testTag("project_card_${project.id}"),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(
            brush = Brush.linearGradient(
                if (project.featured) listOf(AccentPink, AccentPurple) else listOf(CardBorder, PrimaryBlue.copy(alpha = 0.4f))
            )
        )
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            
            // Image / Screenshot Placeholder with explicit TODO
            if (project.imageRes != null) {
                Box {
                    Image(
                        painter = painterResource(id = project.imageRes),
                        contentDescription = project.title,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(170.dp)
                            .clip(RoundedCornerShape(12.dp))
                    )
                    if (project.featured) {
                        Box(
                            modifier = Modifier
                                .padding(8.dp)
                                .clip(RoundedCornerShape(20.dp))
                                .background(Brush.horizontalGradient(listOf(AccentPink, AccentPurple)))
                                .padding(horizontal = 10.dp, vertical = 4.dp)
                                .align(Alignment.TopEnd)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Star, contentDescription = null, tint = Color.White, modifier = Modifier.size(12.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("Featured", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = Color.White)
                            }
                        }
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))
            }

            // Screenshot TODO notice requested by user
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(8.dp))
                    .background(Slate800)
                    .border(1.dp, Color(0xFFF59E0B).copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                    .padding(horizontal = 10.dp, vertical = 5.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.ImageIcon, contentDescription = null, tint = Color(0xFFF59E0B), modifier = Modifier.size(14.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = if (project.id == "audit_analytics") "TODO: Add sanitized/redacted sample screenshots" else "TODO: Add ${project.title} project screenshots",
                        fontSize = 11.sp,
                        color = Color(0xFFFBBF24),
                        fontWeight = FontWeight.Medium
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(AccentCyan.copy(alpha = 0.15f))
                        .padding(horizontal = 8.dp, vertical = 2.dp)
                ) {
                    Text(project.category, fontSize = 11.sp, color = AccentCyan, fontWeight = FontWeight.SemiBold)
                }
            }

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = project.title,
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = project.description,
                fontSize = 13.sp,
                color = Slate300,
                lineHeight = 18.sp
            )

            Spacer(modifier = Modifier.height(10.dp))

            // Tech Stack pills
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                project.techStack.forEach { tech ->
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(Slate800)
                            .padding(horizontal = 8.dp, vertical = 3.dp)
                    ) {
                        Text(tech, fontSize = 11.sp, color = Slate300)
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Actions row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                if (project.id == "audit_analytics") {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(10.dp))
                            .background(Slate800)
                            .padding(horizontal = 12.dp, vertical = 8.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                          Icon(Icons.Default.Lock, contentDescription = null, tint = Slate400, modifier = Modifier.size(14.dp))
                          Spacer(modifier = Modifier.width(6.dp))
                          Text("No link (confidential work at CAG of India)", fontSize = 12.sp, color = Slate400)
                        }
                    }
                } else {
                    if (project.hasCaseStudy) {
                        Button(
                            onClick = onOpenCaseStudy,
                            modifier = Modifier
                                .weight(1f)
                                .height(42.dp)
                                .testTag("btn_case_study_${project.id}"),
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = AccentPink)
                        ) {
                            Icon(Icons.Default.AutoAwesome, contentDescription = null, modifier = Modifier.size(15.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text("Case Study", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }
                    } else if (project.liveUrl != null) {
                        Button(
                            onClick = onOpenLiveUrl,
                            modifier = Modifier
                                .weight(1f)
                                .height(42.dp)
                                .testTag("btn_live_demo_${project.id}"),
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue)
                        ) {
                            Icon(Icons.Default.Language, contentDescription = null, modifier = Modifier.size(15.dp))
                            Spacer(modifier = Modifier.width(6.dp))
                            Text("Live Demo", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }
                    }

                    OutlinedButton(
                        onClick = onOpenGithub,
                        modifier = Modifier
                            .weight(1f)
                            .height(42.dp)
                            .testTag("btn_github_${project.id}"),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White)
                    ) {
                        Icon(Icons.Default.Code, contentDescription = null, modifier = Modifier.size(15.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("GitHub", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                    }
                }
            }
        }
    }
}
