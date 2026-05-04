package ch.uzh.hlc.lifestreams

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class GoogleApiService(@Qualifier("googleHealthWebClient") private val webClient: WebClient) {

}
