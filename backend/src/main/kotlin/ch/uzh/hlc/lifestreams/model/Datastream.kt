package ch.uzh.hlc.lifestreams.model

import kotlinx.coroutines.flow.Flow
import org.springframework.data.annotation.Id
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository
import java.time.Instant
import java.util.*


@Table("datastreams")
data class Datastream(
	@Id val id: Long?,
	val individualCategoryId: Long,
	val createdAt: Instant,
	val value: Double,
)


data class DatastreamDTO(
	val id: Long,
	val createdAt: Instant,
	val value: Double,
	val categoryId: Long,
	val categoryDescription: String,
	val classes: List<String>,
	val unit: String,
	val manufacturer: String,
	val model: String,
)

@Repository
interface DatastreamRepository : CoroutineCrudRepository<DatastreamDTO, Long> {
	@Query(
		"""
		SELECT DISTINCT ON (icat.id) ds.id, ds.created_at, ds.value, cat.id AS category_id, cat.description AS category_description, cat.classes, icat.unit, idev.manufacturer, idev.model
		FROM datastreams ds
		LEFT JOIN individual_categories icat ON ds.individual_category_id = icat.id
		LEFT JOIN categories cat ON icat.category_id = cat.id
		LEFT JOIN individual_devices idev ON icat.device_id = idev.id
		WHERE idev.individual_id = :individualId
		ORDER BY icat.id, ds.created_at DESC
	"""
	)
	fun findAllByIndividualId(individualId: UUID): Flow<DatastreamDTO>
}
