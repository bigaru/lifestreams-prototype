package ch.uzh.hlc.lifestreams

import ch.uzh.hlc.lifestreams.model.DatastreamOverview
import ch.uzh.hlc.lifestreams.model.DatastreamOverviewRepository
import ch.uzh.hlc.lifestreams.model.LastDatastreamRepository
import ch.uzh.hlc.lifestreams.model.WindowSize
import kotlinx.coroutines.flow.Flow
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*


@RestController
@RequestMapping("/api/v1/datastreams")
class DatastreamController(
	@Value($$"${spring.application.name}") val appName: String,
	private val overviewRepo: DatastreamOverviewRepository,
	private val lastRepo: LastDatastreamRepository,
) {
	companion object {
		val log: Logger = LoggerFactory.getLogger(DatastreamController::class.java)
	}

	@GetMapping("/")
	fun index(): Mono<String> = Mono.just("Hello  $appName")

	// @TODO retrieve individualId from auth
	@GetMapping("/overview/{individualId}")
	fun overview(@PathVariable("individualId") individualId: UUID): Flow<DatastreamOverview> {
		return overviewRepo.findAllByIndividualId(individualId)
	}

	@GetMapping("/last/{individualId}")
	fun last(
		@PathVariable("individualId") individualId: UUID,
		@RequestParam(defaultValue = "0") page: Int,
		@RequestParam categoryId: Long,
		@RequestParam window: WindowSize
	): Flux<List<Any?>> {
		return lastRepo.fetchLastData(window, "avg", page, individualId, categoryId)
	}
}
