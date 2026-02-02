package ch.uzh.hlc.lifestreams

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LifestreamsApplication

fun main(args: Array<String>) {
    runApplication<LifestreamsApplication>(*args)
}
