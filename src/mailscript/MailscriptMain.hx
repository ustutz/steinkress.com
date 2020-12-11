package mailscript;

import js.html.FormData;
import js.jquery.JQuery;
import js.html.XMLHttpRequest;
import js.html.TextAreaElement;
import js.html.URLSearchParams;
import js.html.InputElement;
import js.html.Event;
import js.Browser.document;

using Lambda;

class MailscriptMain {
	
	static function main() {
		final form = document.getElementById( 'contactForm' );
		final submit = document.getElementById( 'submit-btn' );
	
		final fields = ['name','email', 'subject'].map( id -> cast( document.getElementById( id ), InputElement ));
		for( field in fields ) field.addEventListener( 'blur', ( e:Event ) -> {
			final inputElement = cast( e.target, InputElement );
			markIfEmpty( inputElement );
		});

		final messageField = cast( document.getElementById( "message" ), TextAreaElement );
		final checkbox = cast( document.getElementById( "checkbox"), InputElement );
		checkbox.addEventListener( 'click', ( e:Event ) -> if( checkbox.checked ) checkbox.classList.remove( "checkbox-red" ));

		final closeModal = document.getElementById( "close_modal" );
		closeModal.addEventListener( 'click', ( e:Event ) -> untyped new JQuery( "#responseModal" ).modal('hide'));

		form.addEventListener( 'submit', ( e:Event ) -> {
			e.preventDefault();
			final isFieldEmpty = fields.fold(( field, error ) -> field.value == "" ? true : error, false );
			
			if( isFieldEmpty ) for( field in fields ) markIfEmpty( field );
			if( !checkbox.checked ) checkbox.classList.add( "checkbox-red" );
				
			if( !isFieldEmpty && checkbox.checked ) {
				// final searchParams = new URLSearchParams();
				// searchParams.append( "name", fields[0].value );
				// searchParams.append( "email", fields[1].value );
				// searchParams.append( "subject", fields[2].value );
				// searchParams.append( "message", messageField.value );
				
				// final queryString = untyped searchParams.toString();
				// trace( queryString );

				final formData = untyped new FormData( document.forms.contact );

				final submitText = submit.innerHTML;

				final xhr = new XMLHttpRequest();
				xhr.onreadystatechange = ( e:Event ) -> {
					if( xhr.readyState == 4 ) {
						submit.innerHTML = submitText;
						final headlineElement = document.getElementById( "response_headline" );
						final contentElement = document.getElementById( "response_content" );
						untyped new JQuery( "#responseModal" ).modal('show');
						if( xhr.status == 200 && xhr.response != "error" ) {
							headlineElement.innerHTML = headlineElement.dataset.success;
							contentElement.innerHTML = contentElement.dataset.success;
						} else {
							headlineElement.innerHTML = headlineElement.dataset.failure;
							contentElement.innerHTML = contentElement.dataset.failure;
						}
					}
				}
				xhr.open( "POST", "./sendit.php" );
				xhr.send( formData );
				submit.innerHTML = "Sending...";

			}

		});

	}

	static function markIfEmpty( inputElement:InputElement ) {
		if( inputElement.value == "" ) {
			inputElement.classList.add( "form-error" );
		} else {
			inputElement.classList.remove( "form-error" );
		}
	}

}