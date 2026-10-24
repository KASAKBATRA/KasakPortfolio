package com.example.kasakportfolio.ui.screens

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
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.kasakportfolio.model.PortfolioDataSource
import com.example.kasakportfolio.model.SkillCategory
import com.example.kasakportfolio.model.SkillItem
import com.example.kasakportfolio.ui.theme.AccentCyan
import com.example.kasakportfolio.ui.theme.AccentGreen
import com.example.kasakportfolio.ui.theme.AccentPurple
import com.example.kasakportfolio.ui.theme.CardBackground
import com.example.kasakportfolio.ui.theme.CardBorder
import com.example.kasakportfolio.ui.theme.PrimaryBlue
import com.example.kasakportfolio.ui.theme.Slate200
import com.example.kasakportfolio.ui.theme.Slate300
import com.example.kasakportfolio.ui.theme.Slate400
import com.example.kasakportfolio.ui.theme.Slate800
import com.example.kasakportfolio.ui.theme.Slate900

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun SkillsScreen(
    modifier: Modifier = Modifier
) {
    var activeSkill by remember { mutableStateOf<Pair<SkillItem, Color>?>(null) }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate900)
            .testTag("skills_screen_content")
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(8.dp))
            SectionHeader(
                title = "Skills & Technologies",
                subtitle = "Technical competencies in AI, Data Science & Development"
            )
        }

        item {
            StatsOverviewRow()
        }

        // Active selected skill inspection banner
        item {
            activeSkill?.let { (skill, color) ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("active_skill_detail"),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Slate800),
                    border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(color, AccentCyan)))
                ) {
                    Row(
                        modifier = Modifier.padding(14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(color.copy(alpha = 0.2f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.Info, contentDescription = null, tint = color, modifier = Modifier.size(20.dp))
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(skill.name, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                            Text(skill.desc, fontSize = 13.sp, color = Slate200)
                        }
                    }
                }
            } ?: Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(14.dp))
                    .background(Slate800.copy(alpha = 0.6f))
                    .padding(12.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "💡 Tap any skill card below to view its specific application and use cases",
                    fontSize = 12.sp,
                    color = Slate400
                )
            }
        }

        items(PortfolioDataSource.skillCategories) { category ->
            SkillCategoryCard(
                category = category,
                selectedSkill = activeSkill?.first,
                onSkillSelected = { skill, color ->
                    activeSkill = skill to color
                }
            )
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun StatsOverviewRow() {
    val stats = listOf(
        Triple("15+", "Projects", Icons.Default.Code to PrimaryBlue),
        Triple("2", "Papers", Icons.Default.Book to AccentPurple),
        Triple("50+", "Datasets", Icons.Default.BarChart to AccentGreen),
        Triple("10+", "ML Models", Icons.Default.Psychology to AccentCyan)
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        stats.forEach { (count, label, iconPair) ->
            val (icon, color) = iconPair
            Card(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = CardBackground),
                border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, color.copy(alpha = 0.4f))))
            ) {
                Column(
                    modifier = Modifier.padding(10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(icon, contentDescription = null, tint = color, modifier = Modifier.size(18.dp))
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(count, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    Text(label, fontSize = 10.sp, color = Slate400)
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun SkillCategoryCard(
    category: SkillCategory,
    selectedSkill: SkillItem?,
    onSkillSelected: (SkillItem, Color) -> Unit
) {
    val categoryColor = Color(category.colorHex)

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .testTag("skill_category_${category.title.lowercase().replace(" ", "_")}"),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground),
        border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(CardBorder, categoryColor.copy(alpha = 0.4f))))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(10.dp)
                        .clip(CircleShape)
                        .background(categoryColor)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = category.title,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                category.skills.forEach { skill ->
                    val isSelected = selectedSkill?.name == skill.name
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .background(if (isSelected) categoryColor.copy(alpha = 0.25f) else Slate800)
                            .border(
                                width = if (isSelected) 1.5.dp else 1.dp,
                                color = if (isSelected) categoryColor else CardBorder,
                                shape = RoundedCornerShape(12.dp)
                            )
                            .clickable { onSkillSelected(skill, categoryColor) }
                            .padding(horizontal = 14.dp, vertical = 8.dp)
                    ) {
                        Text(
                            text = skill.name,
                            fontSize = 13.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                            color = if (isSelected) Color.White else Slate200
                        )
                    }
                }
            }
        }
    }
}
