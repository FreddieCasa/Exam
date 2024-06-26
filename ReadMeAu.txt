Authorization in Spring (Back-end)

    Spring Security:
        Use Spring Security to manage authentication and authorization on the server side. Spring Security can handle user roles, permissions, and protect routes based on these roles.

    JWT (JSON Web Tokens):
        Implement JWT for stateless authentication. After a user logs in, the server issues a JWT, which the client (React) includes in the header of subsequent requests.
        Spring Security can verify and decode JWTs to authenticate and authorize users for each request.

    Role-Based Access Control:
        Define roles and permissions in your application (e.g., ROLE_USER, ROLE_ADMIN).
        Protect endpoints by specifying which roles can access them using annotations like @PreAuthorize or @Secured.


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/books/**").hasRole("USER")
            .antMatchers("/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
            .and()
            .addFilter(new JwtAuthenticationFilter(authenticationManager()))
            .addFilter(new JwtAuthorizationFilter(authenticationManager()));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
            .withUser("user").password(passwordEncoder().encode("password")).roles("USER")
            .and()
            .withUser("admin").password(passwordEncoder().encode("admin")).roles("ADMIN");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

Authorization in React (Front-end)

    Token Storage:
        Store the JWT in a secure storage mechanism, such as localStorage or sessionStorage.

    HTTP Interceptors:
        Use HTTP interceptors to include the JWT in the headers of requests automatically.

    Role-Based UI Rendering:
        Check user roles on the client side to conditionally render UI elements based on the user's role.

    Protected Routes:
        Use a library like react-router to protect routes and redirect users based on their authorization status.

import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

const App = () => (
    <Router>
        <PrivateRoute path="/books" component={BookList} />
        <PrivateRoute path="/add-book" component={AddBook} />
    </Router>
);

export default App;
