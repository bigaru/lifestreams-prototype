package ch.uzh.hlc.lifestreams.model

import org.springframework.core.convert.converter.Converter
import org.springframework.r2dbc.core.DatabaseClient
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.time.Instant
import java.util.*

enum class WindowSize { DAY, WEEK, MONTH, YEAR, }

@Component
class WindowSizeConverter : Converter<String, WindowSize> {
	override fun convert(source: String): WindowSize {
		return WindowSize.entries.firstOrNull { it.name.equals(source, ignoreCase = true) }
			?: throw IllegalArgumentException("Unknown status: $source")
	}
}

@Repository
class LastDatastreamRepository(
	private val databaseClient: DatabaseClient
) {
	fun fetchLastData(windowSize: WindowSize, aggFn: String, page: Int, individualId: UUID, categoryId: Long): Flux<List<Any?>> {
		val statement = when (windowSize) {
			WindowSize.DAY -> "select instant, value from last_single_day($page, '$individualId', $categoryId)"
			WindowSize.WEEK -> "select instant, $aggFn from last_n_days('d', $page, '$individualId', $categoryId)"
			WindowSize.MONTH -> "select instant, $aggFn from last_n_days('m', $page, '$individualId', $categoryId)"
			WindowSize.YEAR -> "select instant, $aggFn from last_twelve_months($page, '$individualId', $categoryId)"
		}

		val valueColumnName = when (windowSize) {
			WindowSize.DAY -> "value"
			else -> aggFn
		}

		return databaseClient
			.sql(statement)
			.map { row, _ -> listOf(row.get("instant", Instant::class.java)!!, row.get(valueColumnName, Double::class.java)!!) }
			.all() as Flux<List<Any?>>
	}
}
