package ch.uzh.hlc.lifestreams

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController {
	@GetMapping("/")
	fun index(): String = "Hello Panda!"
}
