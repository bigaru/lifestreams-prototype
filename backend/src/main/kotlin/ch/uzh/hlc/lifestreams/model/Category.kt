package ch.uzh.hlc.lifestreams.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.stereotype.Repository
import org.springframework.data.repository.kotlin.CoroutineCrudRepository


@JvmInline
value class CategoryId(private val v: Long)

@Table("categories")
data class Category(
	@Id val id: CategoryId?,
	val description: String,
)

@Repository
interface CategoryRepository : CoroutineCrudRepository<Category, Long>


@Table("individual_categories")
data class IndividualCategory(
	@Id val id: Long?,
	val CategoryId: CategoryId,
	val unit: String,
	val deviceId: Long,
)

@Repository
interface IndividualCategoryRepository : CoroutineCrudRepository<IndividualCategory, Long>
