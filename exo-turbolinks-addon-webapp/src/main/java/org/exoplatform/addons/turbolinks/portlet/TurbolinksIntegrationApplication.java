package org.exoplatform.addons.turbolinks.portlet;

import javax.inject.Inject;

import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;

import juzu.Path;
import juzu.RequestScoped;
import juzu.Response;
import juzu.View;
import juzu.request.ApplicationContext;
import juzu.request.SecurityContext;
import juzu.request.UserContext;
import juzu.template.Template;

@RequestScoped
public class TurbolinksIntegrationApplication {
	
	private static final Log LOG = ExoLogger.getExoLogger(TurbolinksIntegrationApplication.class);
	
	@Inject
	@Path(value = "index.gtmpl")
	Template index;
	
	@View
	public Response.Content index(ApplicationContext applicationContext, SecurityContext securityContext, UserContext userContext) {
		try {
			LOG.info("TurbolinksIntegration portlet.");
		}
		catch (final Exception exception) {
			LOG.error(exception.getMessage(), exception);
		}
		
		return null;
	}
	
}
