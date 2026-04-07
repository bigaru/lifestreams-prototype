package ch.uzh.hlc.lifestreams.model

import com.fasterxml.jackson.annotation.JsonIgnore
import kotlinx.coroutines.flow.Flow
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository
import java.time.Instant
import java.util.*


@Table("datastream_overview")
data class DatastreamOverview(
	val createdAt: Instant,
	val value: Double,
	val categoryDescription: String,
	val classes: List<String>,
	val unit: String,
	@JsonIgnore val individualId: UUID,
	val manufacturer: String,
	val model: String,
)

@Repository
interface DatastreamOverviewRepository : CoroutineCrudRepository<DatastreamOverview, Long> {
	fun findAllByIndividualId(individualId: UUID): Flow<DatastreamOverview>
}
