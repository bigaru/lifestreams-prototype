package ch.uzh.hlc.lifestreams.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.stereotype.Repository
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.util.UUID

@Table("individual_devices")
data class IndividualDevice(
	@Id val id: Long?,
	val individualId: UUID,
	val manufacturer: String,
	val model: String,
)


@Repository
interface IndividualDeviceRepository : CoroutineCrudRepository<IndividualDevice, Long>
