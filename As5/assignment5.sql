-- Question 1

SELECT 
    FullName,
    Country,
    TotalOrderValue,
    CountryRank
FROM (
    SELECT 
        e.employee_id,
        concat(e.first_name, ' ', e.last_name) FullName,
        c.Country,
        SUM(od.unit_price * od.Quantity * (1 - od.Discount)) TotalOrderValue,
        RANK() OVER (PARTITION BY c.Country ORDER BY SUM(od.unit_price * od.Quantity * (1 - od.Discount)) DESC) CountryRank
    FROM 
        employees e
    JOIN 
        orders o ON e.employee_id = o.employee_id
    JOIN 
        customers c ON o.customer_id = c.customer_id
    JOIN 
        order_details od ON o.order_id = od.order_id
    GROUP BY 
        e.employee_id, e.first_name, e.last_name, c.Country
) AS RankedEmployeeOrderValues
WHERE 
    CountryRank <= 3
ORDER BY 
    Country, CountryRank;

-- Question 2

SELECT 
    p.product_name,
    c.category_name,
    ps.TotalProductSales total_sales,
    (ps.TotalProductSales / CategorySales.TotalCategorySales) * 100 category_percentage,
    (ps.TotalProductSales / 
    (
        SELECT 
    	SUM(unit_price * quantity * (1 - discount))
    	FROM 
        	order_details
	)) * 100 overall_percentage
FROM 
    products p
JOIN 
    categories c ON p.category_id = c.category_id
JOIN (
    SELECT 
        product_id,
        SUM(unit_price * quantity * (1 - discount)) TotalProductSales
    FROM 
        order_details
    GROUP BY 
        product_id
) ps ON p.product_id = ps.product_id
JOIN (
    SELECT 
        c.category_id,
        SUM(od.unit_price * od.quantity * (1 - od.discount)) TotalCategorySales
    FROM 
        products p
    JOIN 
        categories c ON p.category_id = c.category_id
    JOIN 
        order_details od ON p.product_id = od.product_id
    GROUP BY 
        c.category_id
) CategorySales ON p.category_id = CategorySales.category_id
order by c.category_id, overall_percentage desc

-- Question 3

WITH TotalCategories AS (
    SELECT COUNT(DISTINCT category_id) TotalCategoryCount
    FROM categories
)
SELECT 
    c.company_name, 
    COUNT(DISTINCT p.category_id) categories_ordered
FROM 
    customers c
JOIN 
    orders o ON o.customer_id = c.customer_id
JOIN 
    order_details od ON od.order_id = o.order_id
JOIN 
    products p ON p.product_id = od.product_id
GROUP BY 
    c.company_name
HAVING 
    COUNT(DISTINCT p.category_id) = (SELECT TotalCategoryCount FROM TotalCategories);

-- Question 4

WITH EmployeeOrders (
    SELECT 
        CONCAT(e.first_name, ' ', e.last_name) FullName,
        o.order_date,
        SUM(od.unit_price * od.quantity * (1 - od.discount)) TotalOrderValue
    FROM 
        employees e
    JOIN 
        orders o ON e.employee_id = o.employee_id
    JOIN 
        order_details od ON o.order_id = od.order_id
    GROUP BY e.first_name, e.last_name, o.order_date
),
EmployeeOrdersWithLag AS (
    SELECT 
        eo.FullName,
        eo.order_date,
        eo.TotalOrderValue,
        LAG(eo.TotalOrderValue, 1) OVER (PARTITION BY eo.FullName  ORDER BY eo.order_date) PrevOrderValue1,
        LAG(eo.TotalOrderValue, 2) OVER (PARTITION BY eo.FullName ORDER BY eo.order_date) PrevOrderValue2
    FROM 
        EmployeeOrders eo
)
SELECT 
    FullName,
    order_date,
    TotalOrderValue,
    (TotalOrderValue + COALESCE(PrevOrderValue1, 0) + COALESCE(PrevOrderValue2, 0)) / 
    (
        1 + 
        CASE WHEN PrevOrderValue1 is NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN PrevOrderValue2 IS NOT NULL THEN 1 ELSE 0 END
    ) MovingAverage
FROM 
    EmployeeOrdersWithLag
ORDER BY 
     fullname, order_date;

-- Question 5

WITH ProductSales AS (
    SELECT 
        p.product_id,
        p.product_name,
        c.category_name,
        SUM(od.unit_price * od.quantity * (1 - od.discount)) TotalProductSales
    FROM 
        products p
    JOIN 
        categories c ON p.category_id = c.category_id
    JOIN 
        order_details od ON p.product_id = od.product_id
    GROUP BY 
        p.product_id, p.product_name, c.category_name
),
RankedProductSales AS (
    SELECT 
        ps.product_name,
        ps.category_name,
        ps.TotalProductSales,
        PERCENT_RANK() OVER (
            PARTITION BY ps.category_name ORDER BY ps.TotalProductSales DESC
            ) * 100 percentile_rank
    FROM 
        ProductSales ps
)
SELECT 
    product_name,
    category_name,
    TotalProductSales,
    percentile_rank
FROM 
    RankedProductSales
WHERE 
    percentile_rank <= 25
ORDER BY 
    category_name, percentile_rank;