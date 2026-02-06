package ch.uzh.hlc.lifestreams.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.stereotype.Repository
import org.springframework.data.repository.kotlin.CoroutineCrudRepository


@JvmInline
value class DeviceId(private val v: Long)


@Table("individual_devices")
data class IndividualDevice(
	@Id val id: DeviceId?,
	val IndividualId: IndividualId,
	val manufacturer: String,
	val model: String,
)


@Repository
interface IndividualDeviceRepository : CoroutineCrudRepository<IndividualDevice, Long>
