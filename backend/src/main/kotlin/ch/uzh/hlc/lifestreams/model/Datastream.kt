package ch.uzh.hlc.lifestreams.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.stereotype.Repository
import java.time.Instant


@Table("datastreams")
data class Datastream(
	@Id val id: Long?,
	val individualCategoryId: Long,
	val createdAt: Instant,
	val value: Double,
)

@Repository
interface DatastreamRepository : CoroutineCrudRepository<Datastream, Long>
