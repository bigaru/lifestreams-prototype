package ch.uzh.hlc.lifestreams

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.beans.factory.annotation.Value
import kotlinx.coroutines.flow.Flow
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;
import ch.uzh.hlc.lifestreams.model.DatastreamRepository
import ch.uzh.hlc.lifestreams.model.Datastream
import org.slf4j.LoggerFactory
import org.slf4j.Logger


@RestController
class TestController (
	@Value("\${spring.application.name}")  val name: String,
	val repository: DatastreamRepository,
	) {

	companion object{
		val log: Logger = LoggerFactory.getLogger(TestController::class.java)
	}



	@GetMapping("/")
	fun index(): Mono<String> = Mono.just( "Hello  ${this.name}")


	@GetMapping("/test")
	fun test(): Flow<Datastream>  {
		return repository.findAll()
	}


}
