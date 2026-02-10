package ch.uzh.hlc.lifestreams

import ch.uzh.hlc.lifestreams.model.DatastreamDTO
import ch.uzh.hlc.lifestreams.model.DatastreamRepository
import kotlinx.coroutines.flow.Flow
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
	private val repo: DatastreamRepository,
) {
	companion object {
		val log: Logger = LoggerFactory.getLogger(DatastreamController::class.java)
	}

	// @TODO retrieve individualId from auth
	@GetMapping("/overview/{individualId}")
	fun overview(@PathVariable("individualId") individualId: UUID): Flow<DatastreamDTO> {
		return repo.findAllByIndividualId(individualId)
	}
}
