package ch.uzh.hlc.lifestreams

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.oauth2.client.ReactiveOAuth2AuthorizedClientService
import org.springframework.security.web.server.SecurityWebFilterChain


@Configuration
@EnableWebFluxSecurity
class SecurityConfig(private val authorizedClientService: ReactiveOAuth2AuthorizedClientService) {

	@Bean
	fun securityWebFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain =
		http
			.csrf { it.disable() }
			.authorizeExchange { exchanges ->
				exchanges
					.pathMatchers("/public/**", "/actuator/health", "/api/..").permitAll()
					.anyExchange().authenticated()
			}
			.oauth2Login { }
			.oauth2Client { }
			.build()

}
