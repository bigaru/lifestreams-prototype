package ch.uzh.hlc.lifestreams

import ch.uzh.hlc.lifestreams.model.Datastream
import ch.uzh.hlc.lifestreams.model.DatastreamRepository
import kotlinx.coroutines.flow.Flow
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono


@RestController
@RequestMapping("/api/v1")
class TestController(
	@Value($$"${spring.application.name}") val name: String,
	val repository: DatastreamRepository,
) {
	companion object {
		val log: Logger = LoggerFactory.getLogger(TestController::class.java)
	}

	@GetMapping("/")
	fun index(): Mono<String> = Mono.just("Hello  ${this.name}")

	@GetMapping("/test")
	fun test(): Flow<Datastream> {
		return repository.findAll()
	}


}
