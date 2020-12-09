package mailscript;

import js.html.XMLHttpRequest;
import js.html.TextAreaElement;
import js.html.FormData;
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
		final messageField = cast( document.getElementById( "message" ), TextAreaElement );

		for( field in fields ) field.addEventListener( 'blur', ( e:Event ) -> {
			final inputElement = cast( e.target, InputElement );
			markIfEmpty( inputElement );
		});

		form.addEventListener( 'submit', ( e:Event ) -> {
			e.preventDefault();
			final isError = fields.fold(( field, error ) -> field.value == "" ? true : error, false );
			if( isError ) {
				for( field in fields ) markIfEmpty( field );
			} else {
				final searchParams = new URLSearchParams();
				searchParams.append( "name", fields[0].value );
				searchParams.append( "email", fields[1].value );
				searchParams.append( "subject", fields[2].value );
				searchParams.append( "message", messageField.value );
				
				final queryString = untyped searchParams.toString();
				// trace( queryString );

				final xhr = new XMLHttpRequest();
				xhr.open( "POST", "./sendit.php" );
				xhr.send( queryString );

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