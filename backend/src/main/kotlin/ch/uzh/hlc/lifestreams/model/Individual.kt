package ch.uzh.hlc.lifestreams.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.stereotype.Repository
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.util.UUID

@Table("individuals")
data class Individual(
	@Id val id: UUID?,
	val email: String,
	val password: String,
)

@Repository
interface IndividualRepository : CoroutineCrudRepository<Individual, Long>
