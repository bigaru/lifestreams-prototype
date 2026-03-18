package ch.uzh.hlc.lifestreams.model

import org.springframework.r2dbc.core.DatabaseClient
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.time.Instant
import java.util.*

@Repository
class LastDatastreamRepository(
	private val databaseClient: DatabaseClient
) {
	fun fetchLast7Days(aggFn: String, page: Int, individualId: UUID, categoryId: Long): Flux<List<Any?>> {
		return databaseClient
			.sql("select instant, $aggFn from last(7, $page, :individualId, $categoryId)")
			.bind("individualId", individualId)
			.map { row, _ -> listOf(row.get("instant", Instant::class.java)!!, row.get(aggFn, Double::class.java)!!) }
			.all() as Flux<List<Any?>>
	}
}
