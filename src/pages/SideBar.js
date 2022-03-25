import React from 'react'

import React, { Component } from 'react'

export default class SideBar extends Component {
	render() {
		return (
			<div>

				<div className="wrapper d-flex align-items-stretch">
					<nav id="sidebar">
						<div className="custom-menu">
							<button type="button" id="sidebarCollapse" className="btn btn-primary">
								<i className="fa fa-bars"></i>
								<span className="sr-only">Toggle Menu</span>
							</button>
						</div>
						<div className="p-4 pt-5">
							<h1><a href="index.html" className="logo">Splash</a></h1>
							<ul className="list-unstyled components mb-5">
								<li className="active">
									<a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
									<ul className="collapse list-unstyled" id="homeSubmenu">
										<li>
											<a href="#">Home 1</a>
										</li>
										<li>
											<a href="#">Home 2</a>
										</li>
										<li>
											<a href="#">Home 3</a>
										</li>
									</ul>
								</li>
								<li>
									<a href="#">About</a>
								</li>
								<li>
									<a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
									<ul className="collapse list-unstyled" id="pageSubmenu">
										<li>
											<a href="#">Page 1</a>
										</li>
										<li>
											<a href="#">Page 2</a>
										</li>
										<li>
											<a href="#">Page 3</a>
										</li>
									</ul>
								</li>
								<li>
									<a href="#">Portfolio</a>
								</li>
								<li>
									<a href="#">Contact</a>
								</li>
							</ul>

							<div className="mb-5">
								<h3 className="h6">Subscribe for newsletter</h3>
								<form action="#" className="colorlib-subscribe-form">
									<div className="form-group d-flex">
										<div className="icon"><span className="icon-paper-plane"></span></div>
										<input type="text" className="form-control" placeholder="Enter Email Address" />
									</div>
								</form>
							</div>

						</div>
					</nav>

					{/* <!-- Page Content  --> */}
					<div id="content" className="p-4 p-md-5 pt-5">

						<h2 className="mb-4">Sidebar #02</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
				</div>

				<script src="js/jquery.min.js"></script>
				<script src="js/popper.js"></script>
				<script src="js/bootstrap.min.js"></script>
				<script src="js/main.js"></script>
			</div>
		)
	}
}

