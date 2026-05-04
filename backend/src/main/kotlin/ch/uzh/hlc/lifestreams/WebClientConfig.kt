package ch.uzh.hlc.lifestreams

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository
import org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction
import org.springframework.web.reactive.function.client.WebClient


@Configuration
class WebClientConfig {
	@Bean
	fun googleHealthWebClient(
		clientRegistrationRepository: ClientRegistrationRepository,
		authorizedClientRepository: OAuth2AuthorizedClientRepository
	): WebClient {
		val oauth2 = ServletOAuth2AuthorizedClientExchangeFilterFunction(clientRegistrationRepository, authorizedClientRepository)
		oauth2.setDefaultClientRegistrationId("google-health")

		return WebClient.builder()
			.baseUrl("https://health.googleapis.com")
			.filter(oauth2)
			.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
			.build()
	}
}
