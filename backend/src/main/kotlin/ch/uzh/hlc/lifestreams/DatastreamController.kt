package ch.uzh.hlc.lifestreams

import ch.uzh.hlc.lifestreams.model.DatastreamDTO
import ch.uzh.hlc.lifestreams.model.DatastreamRepository
import ch.uzh.hlc.lifestreams.model.IndividualCategoryRepository
import ch.uzh.hlc.lifestreams.model.IndividualDeviceRepository
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flatMapConcat
import kotlinx.coroutines.flow.map
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*


@RestController
@RequestMapping("/api/v1/datastreams")
class DatastreamController(
	private val datastreamRepo: DatastreamRepository,
	private val individualDeviceRepo: IndividualDeviceRepository,
	private val individualCategoryRepo: IndividualCategoryRepository,
) {
	companion object {
		val log: Logger = LoggerFactory.getLogger(DatastreamController::class.java)
	}

	// @TODO retrieve individualId from auth
	@OptIn(ExperimentalCoroutinesApi::class)
	@GetMapping("/overview/{individualId}")
	fun overview(@PathVariable("individualId") individualId: UUID): Flow<DatastreamDTO> {
		val datastreams: Flow<DatastreamDTO> = individualDeviceRepo
			.findAllByIndividualId(individualId)
			.flatMapConcat { devId ->
				individualCategoryRepo.findAllByDeviceId(devId.id!!).map { Pair(devId, it) }
			}
			.flatMapConcat { pair -> datastreamRepo.findAllByIndividualCategoryId(pair.second.id!!).map { Triple(pair.first, pair.second, it) } }.map { (one, two, three) ->
				DatastreamDTO(
					id = three.id!!,
					individualCategoryId = two.categoryId,
					createdAt = three.createdAt,
					value = three.value,
					unit = two.unit,
					manufacturer = one.manufacturer,
					model = one.model
				)
			}

		return datastreams
	}
}
