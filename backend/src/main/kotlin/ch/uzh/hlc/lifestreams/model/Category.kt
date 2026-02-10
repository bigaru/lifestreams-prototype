package ch.uzh.hlc.lifestreams.model

import kotlinx.coroutines.flow.Flow
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository


@Table("categories")
data class Category(
	@Id val id: Long?,
	val description: String,
)

@Repository
interface CategoryRepository : CoroutineCrudRepository<Category, Long>


@Table("individual_categories")
data class IndividualCategory(
	@Id val id: Long?,
	val categoryId: Long,
	val unit: String,
	val deviceId: Long,
)

@Repository
interface IndividualCategoryRepository : CoroutineCrudRepository<IndividualCategory, Long> {
	fun findAllByDeviceId(deviceId: Long): Flow<IndividualCategory>
}
