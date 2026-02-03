package ch.uzh.hlc.lifestreams.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.data.relational.core.mapping.Column
import org.springframework.stereotype.Repository
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.time.Instant

@Table("datastreams")
data class Datastream(
	@Id val id: Long?,
	val dataTypeId: Long,
	val individualId: Long,
	val timestamp: Instant,
	val value: Double,
)

@Repository
interface DatastreamRepository : CoroutineCrudRepository<Datastream, Long>
